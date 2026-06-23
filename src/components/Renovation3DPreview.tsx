"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type StudioFixtureType = "vanity" | "toilet" | "shower" | "bath" | "linen" | "door";

export interface StudioFixture {
  id: string;
  type: StudioFixtureType;
  label: string;
  x: number;
  y: number;
  width: number;
  depth: number;
  rotation: number;
}

interface Renovation3DPreviewProps {
  fixtures: StudioFixture[];
  roomWidth: number;
  roomDepth: number;
  wallColor: string;
  floorColor: string;
  cabinetColor: string;
  metalColor: string;
}

function material(hex: string, roughness = 0.7, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex),
    roughness,
    metalness,
  });
}

function addBox(
  group: THREE.Group,
  width: number,
  height: number,
  depth: number,
  color: string,
  x: number,
  y: number,
  z: number,
  options: { metalness?: number; roughness?: number } = {}
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    material(color, options.roughness ?? 0.72, options.metalness ?? 0.04)
  );
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

export default function Renovation3DPreview({
  fixtures,
  roomWidth,
  roomDepth,
  wallColor,
  floorColor,
  cabinetColor,
  metalColor,
}: Renovation3DPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("#0b201e");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#0b201e", 7, 15);

    const camera = new THREE.PerspectiveCamera(54, 1, 0.1, 100);
    camera.position.set(5.6, 3.6, 6.8);
    camera.lookAt(0, 0.35, 0);

    const root = new THREE.Group();
    root.rotation.y = -0.62;
    root.position.y = 1.62;
    scene.add(root);

    const ambient = new THREE.HemisphereLight("#f7f1e8", "#153331", 2.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#fff4dc", 3.2);
    key.position.set(2.8, 6.2, 4.4);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    scene.add(key);

    const fill = new THREE.PointLight(metalColor, 1.5, 8);
    fill.position.set(-2.6, 2.3, 2.8);
    scene.add(fill);

    const widthM = roomWidth / 100;
    const depthM = roomDepth / 100;
    const wallH = 2.45;
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(widthM, 0.08, depthM),
      material(floorColor, 0.82, 0.02)
    );
    floor.position.y = -0.04;
    floor.receiveShadow = true;
    root.add(floor);

    const grid = new THREE.GridHelper(Math.max(widthM, depthM), 16, "#d8c6aa", "#617b76");
    grid.position.y = 0.012;
    grid.material.opacity = 0.24;
    grid.material.transparent = true;
    root.add(grid);

    addBox(root, widthM, wallH, 0.08, wallColor, 0, wallH / 2, -depthM / 2, { roughness: 0.9 });
    addBox(root, 0.08, wallH, depthM, wallColor, -widthM / 2, wallH / 2, 0, { roughness: 0.9 });

    const wetZone = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.25),
      new THREE.MeshBasicMaterial({ color: "#37a7b7", transparent: true, opacity: 0.16 })
    );
    wetZone.rotation.x = -Math.PI / 2;
    wetZone.position.set(-widthM * 0.28, 0.015, depthM * 0.2);
    root.add(wetZone);

    const fixtureGroup = new THREE.Group();
    root.add(fixtureGroup);

    fixtures.forEach((fixture) => {
      const x = (fixture.x / 100) - widthM / 2 + fixture.width / 200;
      const z = (fixture.y / 100) - depthM / 2 + fixture.depth / 200;
      const w = fixture.width / 100;
      const d = fixture.depth / 100;
      const item = new THREE.Group();
      item.position.set(x, 0, z);
      item.rotation.y = (fixture.rotation * Math.PI) / 180;

      if (fixture.type === "vanity") {
        addBox(item, w, 0.64, d, cabinetColor, 0, 0.32, 0);
        addBox(item, w + 0.08, 0.06, d + 0.08, "#f7f5ef", 0, 0.67, 0, { roughness: 0.55 });
        const bowl = new THREE.Mesh(
          new THREE.CylinderGeometry(Math.min(w, d) * 0.22, Math.min(w, d) * 0.22, 0.05, 32),
          material("#e8edf0", 0.38, 0.02)
        );
        bowl.position.set(0, 0.72, 0.02);
        bowl.castShadow = true;
        item.add(bowl);
        addBox(item, 0.08, 0.24, 0.06, metalColor, 0, 0.83, -d * 0.22, { metalness: 0.7, roughness: 0.28 });
      }

      if (fixture.type === "shower") {
        addBox(item, w, 0.04, d, "#dce9e6", 0, 0.02, 0, { roughness: 0.55 });
        addBox(item, 0.045, 1.9, d, "#93c5d4", -w / 2, 0.95, 0, { roughness: 0.18, metalness: 0.05 });
        addBox(item, w, 1.9, 0.045, "#93c5d4", 0, 0.95, d / 2, { roughness: 0.18, metalness: 0.05 });
        addBox(item, 0.12, 0.02, 0.8, metalColor, 0, 0.06, 0, { metalness: 0.75, roughness: 0.24 });
      }

      if (fixture.type === "toilet") {
        addBox(item, w * 0.78, 0.28, d * 0.32, "#f7f7f4", 0, 0.38, -d * 0.28, { roughness: 0.42 });
        const bowl = new THREE.Mesh(
          new THREE.CylinderGeometry(w * 0.32, w * 0.24, 0.34, 32),
          material("#fbfbf7", 0.46, 0.02)
        );
        bowl.rotation.x = Math.PI / 2;
        bowl.position.set(0, 0.32, d * 0.1);
        bowl.castShadow = true;
        item.add(bowl);
      }

      if (fixture.type === "bath") {
        const bath = new THREE.Mesh(
          new THREE.CapsuleGeometry(Math.min(w, d) * 0.28, Math.max(w, d) * 0.52, 8, 28),
          material("#f8f7f1", 0.44, 0.03)
        );
        bath.rotation.z = Math.PI / 2;
        bath.position.set(0, 0.34, 0);
        bath.scale.set(1.08, 0.32, 0.42);
        bath.castShadow = true;
        item.add(bath);
        addBox(item, 0.1, 0.28, 0.06, metalColor, -w * 0.35, 0.62, -d * 0.28, { metalness: 0.72, roughness: 0.25 });
      }

      if (fixture.type === "linen") {
        addBox(item, w, 1.78, d, cabinetColor, 0, 0.89, 0, { roughness: 0.72 });
        addBox(item, 0.03, 1.48, 0.03, metalColor, w * 0.18, 0.9, d / 2 + 0.02, { metalness: 0.65, roughness: 0.32 });
      }

      if (fixture.type === "door") {
        addBox(item, w, 0.04, d, "#c6ad83", 0, 0.03, 0, { roughness: 0.78 });
        const swing = new THREE.Mesh(
          new THREE.TorusGeometry(Math.max(w, d) * 0.8, 0.01, 8, 48, Math.PI / 2),
          new THREE.MeshBasicMaterial({ color: "#f4d58a", transparent: true, opacity: 0.65 })
        );
        swing.rotation.x = Math.PI / 2;
        swing.position.y = 0.06;
        item.add(swing);
      }

      fixtureGroup.add(item);
    });

    let dragging = false;
    let lastX = 0;
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      root.rotation.y += dx * 0.006;
      lastX = event.clientX;
    };
    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(320, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      if (!dragging) root.rotation.y += 0.0014;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const objectMaterial = object.material;
          if (Array.isArray(objectMaterial)) objectMaterial.forEach((item) => item.dispose());
          else objectMaterial.dispose();
        }
      });
    };
  }, [fixtures, roomWidth, roomDepth, wallColor, floorColor, cabinetColor, metalColor]);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", minHeight: 360, position: "relative", background: "#0b201e" }}>
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D renovation preview"
        style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
      />
      <div
        style={{
          position: "absolute",
          left: 14,
          bottom: 14,
          color: "rgba(255,255,255,0.72)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          background: "rgba(8,25,24,0.72)",
          border: "1px solid rgba(232,184,75,0.35)",
          padding: "7px 10px",
          borderRadius: 4,
          pointerEvents: "none",
        }}
      >
        Drag to rotate preview
      </div>
    </div>
  );
}
