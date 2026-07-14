import React, { useEffect, useRef } from "react";
import "./Grainient.css";

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const compileShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "Shader compile failed");
  }
  return shader;
};

const createProgram = (gl) => {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.deleteShader(vert);
  gl.deleteShader(frag);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(info || "Program link failed");
  }

  return program;
};

const uniformNames = [
  "iResolution",
  "iTime",
  "uTimeSpeed",
  "uColorBalance",
  "uWarpStrength",
  "uWarpFrequency",
  "uWarpSpeed",
  "uWarpAmplitude",
  "uBlendAngle",
  "uBlendSoftness",
  "uRotationAmount",
  "uNoiseScale",
  "uGrainAmount",
  "uGrainScale",
  "uGrainAnimated",
  "uContrast",
  "uGamma",
  "uSaturation",
  "uCenterOffset",
  "uZoom",
  "uColor1",
  "uColor2",
  "uColor3",
];

const syncUniforms = (ctx, values) => {
  if (!ctx) return;
  const { gl, uniforms } = ctx;
  const [color1R, color1G, color1B] = hexToRgb(values.color1);
  const [color2R, color2G, color2B] = hexToRgb(values.color2);
  const [color3R, color3G, color3B] = hexToRgb(values.color3);

  gl.useProgram(ctx.program);
  gl.uniform1f(uniforms.uTimeSpeed, values.timeSpeed);
  gl.uniform1f(uniforms.uColorBalance, values.colorBalance);
  gl.uniform1f(uniforms.uWarpStrength, values.warpStrength);
  gl.uniform1f(uniforms.uWarpFrequency, values.warpFrequency);
  gl.uniform1f(uniforms.uWarpSpeed, values.warpSpeed);
  gl.uniform1f(uniforms.uWarpAmplitude, values.warpAmplitude);
  gl.uniform1f(uniforms.uBlendAngle, values.blendAngle);
  gl.uniform1f(uniforms.uBlendSoftness, values.blendSoftness);
  gl.uniform1f(uniforms.uRotationAmount, values.rotationAmount);
  gl.uniform1f(uniforms.uNoiseScale, values.noiseScale);
  gl.uniform1f(uniforms.uGrainAmount, values.grainAmount);
  gl.uniform1f(uniforms.uGrainScale, values.grainScale);
  gl.uniform1f(uniforms.uGrainAnimated, values.grainAnimated ? 1 : 0);
  gl.uniform1f(uniforms.uContrast, values.contrast);
  gl.uniform1f(uniforms.uGamma, values.gamma);
  gl.uniform1f(uniforms.uSaturation, values.saturation);
  gl.uniform2f(uniforms.uCenterOffset, values.centerX, values.centerY);
  gl.uniform1f(uniforms.uZoom, values.zoom);
  gl.uniform3f(uniforms.uColor1, color1R, color1G, color1B);
  gl.uniform3f(uniforms.uColor2, color2R, color2G, color2B);
  gl.uniform3f(uniforms.uColor3, color3R, color3G, color3B);
};

export default function Grainient({
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  color1 = "#FF9FFC",
  color2 = "#5227FF",
  color3 = "#B497CF",
  frameInterval = 66,
  maxDpr = 1,
  maxCanvasWidth = 1400,
  maxCanvasHeight = 900,
  className = "",
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const propsRef = useRef({});

  propsRef.current = {
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });

    if (!gl) return undefined;

    let program;
    try {
      program = createProgram(gl);
    } catch {
      return undefined;
    }

    const vao = gl.createVertexArray();
    const buffer = gl.createBuffer();
    const uniforms = Object.fromEntries(
      uniformNames.map((name) => [name, gl.getUniformLocation(program, name)]),
    );
    const positionLocation = gl.getAttribLocation(program, "position");

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = {
      canvas,
      gl,
      program,
      vao,
      buffer,
      uniforms,
      raf: 0,
      start: performance.now(),
      visible: true,
      pageVisible: !document.hidden,
      reduceMotion: motionQuery.matches,
    };
    ctxRef.current = ctx;

    const render = (time = performance.now()) => {
      const width = gl.drawingBufferWidth || 1;
      const height = gl.drawingBufferHeight || 1;
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform1f(uniforms.iTime, (time - ctx.start) * 0.001);
      gl.uniform2f(uniforms.iResolution, width, height);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const viewportWidth = window.innerWidth || rect.width || 1;
      const viewportHeight = window.innerHeight || rect.height || 1;
      const width = Math.max(1, Math.floor(Math.min(rect.width, viewportWidth, maxCanvasWidth) * dpr));
      const height = Math.max(1, Math.floor(Math.min(rect.height, viewportHeight, maxCanvasHeight) * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      render();
    };

    const start = () => {
      if (ctx.raf || !ctx.visible || !ctx.pageVisible || ctx.reduceMotion) return;
      let lastFrame = 0;
      const targetFrameInterval = Math.max(16, frameInterval);
      const loop = (time) => {
        if (time - lastFrame > targetFrameInterval) {
          render(time);
          lastFrame = time;
        }
        ctx.raf = requestAnimationFrame(loop);
      };
      ctx.raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!ctx.raf) return;
      cancelAnimationFrame(ctx.raf);
      ctx.raf = 0;
    };

    syncUniforms(ctx, propsRef.current);
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      ctx.visible = entry.isIntersecting;
      if (ctx.visible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      ctx.pageVisible = !document.hidden;
      if (ctx.pageVisible) start();
      else stop();
    };
    const onMotionPreference = (event) => {
      ctx.reduceMotion = event.matches;
      if (ctx.reduceMotion) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionPreference);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionPreference);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      ctxRef.current = null;
    };
  }, [frameInterval, maxCanvasHeight, maxCanvasWidth, maxDpr]);

  useEffect(() => {
    syncUniforms(ctxRef.current, propsRef.current);
  }, [
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3,
    frameInterval,
    maxDpr,
    maxCanvasWidth,
    maxCanvasHeight,
  ]);

  return <canvas ref={canvasRef} className={`grainient-container ${className}`.trim()} aria-hidden="true" />;
}
