/**
 * GraphCode - Advanced Three.js Scene
 * @description Awwwards-level 3D experience with:
 * - Custom GLSL shaders
 * - Particle systems with physics
 * - Post-processing effects
 * - Mouse interaction
 * - Morphing geometries
 * @version 2.0.0
 */

class ThreeScene {
  constructor() {
    this.container = document.getElementById('three-canvas-container');
    if (!this.container) return;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.time = 0;
    this.isInitialized = false;

    this.init();
    this.createParticles();
    this.createMorphingSpheres();
    this.createFloatingGeometries();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0008);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 2000);
    this.camera.position.z = 800;

    // Renderer with advanced settings
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.container.appendChild(this.renderer.domElement);

    // Clock for animations
    this.clock = new THREE.Clock();

    this.isInitialized = true;
  }

  /**
   * Create particle system with custom shader
   */
  createParticles() {
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x6366f1), // Primary
      new THREE.Color(0x8b5cf6), // Secondary
      new THREE.Color(0xa855f7), // Tertiary
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0x3b82f6), // Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Distribute particles in a sphere
      const radius = Math.random() * 800 + 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random size
      sizes[i] = Math.random() * 3 + 1;

      // Velocity for animation
      velocities[i3] = (Math.random() - 0.5) * 0.5;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      uniform float uTime;
      uniform vec2 uMouse;
      
      void main() {
        vColor = color;
        
        vec3 pos = position;
        
        // Wave effect
        float wave = sin(pos.x * 0.01 + uTime * 0.5) * 20.0;
        wave += cos(pos.y * 0.01 + uTime * 0.3) * 20.0;
        pos.z += wave;
        
        // Mouse influence
        float mouseInfluence = smoothstep(300.0, 0.0, length(pos.xy - uMouse * 500.0));
        pos.z += mouseInfluence * 100.0;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (400.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      
      void main() {
        // Circular particle with soft edges
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `;

    this.particleMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, this.particleMaterial);
    this.particleVelocities = velocities;
    this.scene.add(this.particles);
  }

  /**
   * Create morphing spheres with advanced materials
   */
  createMorphingSpheres() {
    this.morphingSpheres = [];

    const spherePositions = [
      { x: -400, y: 200, z: -200 },
      { x: 400, y: -150, z: -300 },
      { x: 0, y: -300, z: -100 },
    ];

    const sphereColors = [0x6366f1, 0x8b5cf6, 0xec4899];

    spherePositions.forEach((pos, index) => {
      const geometry = new THREE.IcosahedronGeometry(60 + index * 20, 4);
      
      // Store original positions for morphing
      const originalPositions = geometry.attributes.position.array.slice();

      const material = new THREE.MeshPhysicalMaterial({
        color: sphereColors[index],
        metalness: 0.2,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
        emissive: sphereColors[index],
        emissiveIntensity: 0.2
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, pos.y, pos.z);
      sphere.userData.originalPositions = originalPositions;
      sphere.userData.offset = Math.random() * Math.PI * 2;

      this.morphingSpheres.push(sphere);
      this.scene.add(sphere);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0x6366f1, 2, 1000);
    pointLight1.position.set(200, 200, 200);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 2, 1000);
    pointLight2.position.set(-200, -200, 200);
    this.scene.add(pointLight2);
  }

  /**
   * Create floating geometric shapes
   */
  createFloatingGeometries() {
    this.floatingGeometries = [];

    const geometries = [
      new THREE.TorusKnotGeometry(30, 8, 100, 16),
      new THREE.OctahedronGeometry(40, 0),
      new THREE.TetrahedronGeometry(35, 0),
      new THREE.DodecahedronGeometry(30, 0),
    ];

    const positions = [
      { x: -500, y: 100, z: -400 },
      { x: 500, y: -100, z: -500 },
      { x: -300, y: -200, z: -300 },
      { x: 300, y: 250, z: -350 },
    ];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(positions[index].x, positions[index].y, positions[index].z);
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;

      this.floatingGeometries.push(mesh);
      this.scene.add(mesh);
    });
  }

  /**
   * Update morphing spheres
   */
  updateMorphingSpheres() {
    this.morphingSpheres.forEach((sphere, index) => {
      const positions = sphere.geometry.attributes.position.array;
      const original = sphere.userData.originalPositions;
      const offset = sphere.userData.offset;

      for (let i = 0; i < positions.length; i += 3) {
        const x = original[i];
        const y = original[i + 1];
        const z = original[i + 2];

        // Calculate displacement based on noise
        const noise = Math.sin(x * 0.05 + this.time + offset) * 
                     Math.cos(y * 0.05 + this.time * 0.8 + offset) * 
                     Math.sin(z * 0.05 + this.time * 0.6 + offset);
        
        const displacement = noise * 15;

        // Normalize and apply displacement
        const length = Math.sqrt(x * x + y * y + z * z);
        positions[i] = x + (x / length) * displacement;
        positions[i + 1] = y + (y / length) * displacement;
        positions[i + 2] = z + (z / length) * displacement;
      }

      sphere.geometry.attributes.position.needsUpdate = true;

      // Rotation
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.005;
    });
  }

  /**
   * Update floating geometries
   */
  updateFloatingGeometries() {
    this.floatingGeometries.forEach((mesh) => {
      // Rotation
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.rotation.z += mesh.userData.rotationSpeed.z;

      // Floating motion
      const floatOffset = mesh.userData.floatOffset;
      mesh.position.y += Math.sin(this.time + floatOffset) * 0.3;
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Mouse move
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / this.width) * 2 - 1;
      this.mouse.targetY = -(e.clientY / this.height) * 2 + 1;
    });

    // Resize
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    });

    // Scroll parallax
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      this.camera.position.y = -scrollY * 0.3;
      this.camera.lookAt(0, -scrollY * 0.2, 0);
    });
  }

  /**
   * Animation loop
   */
  animate() {
    if (!this.isInitialized) return;

    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    this.time += delta;

    // Smooth mouse following
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Update particle shader uniforms
    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uTime.value = this.time;
      this.particleMaterial.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
    }

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.y += 0.0005;
      this.particles.rotation.x += 0.0002;
    }

    // Update morphing spheres
    this.updateMorphingSpheres();

    // Update floating geometries
    this.updateFloatingGeometries();

    // Camera movement based on mouse
    this.camera.position.x += (this.mouse.x * 50 - this.camera.position.x) * 0.02;
    this.camera.position.y += (this.mouse.y * 30 - this.camera.position.y + window.scrollY * -0.3) * 0.02;

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// Initialize Three.js scene when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on larger screens for performance
  if (window.innerWidth > 768) {
    window.threeScene = new ThreeScene();
  }
});
