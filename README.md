# 🎨 GraphCode - Awwwards Level Website

<div align="center">

![GraphCode Logo](https://img.shields.io/badge/GraphCode-Innovation-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01ek0yIDE3bDEwIDUgMTAtNU0yIDEybDEwIDUgMTAtNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=)

**Una experiencia web de alta calidad diseñada para competir en Awwwards**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

</div>

---

## 📋 Descripción

**GraphCode** es un sitio web de estudio de desarrollo de software e innovación multimedia, construido con tecnologías web modernas y siguiendo los estándares de calidad de sitios premiados en Awwwards. El proyecto demuestra técnicas avanzadas de diseño y desarrollo front-end.

## ✨ Características Principales

### 🎬 ENCARGO 1: Sistema de Cine 2D con Video y PDFs

- **Pantalla de Cine 2D Interactiva**: Sistema completo de reproducción de video con controles personalizados
- **Reproductor de Video Personalizado**:
  - Controles play/pause, mute, fullscreen
  - Barra de progreso interactiva
  - Soporte de atajos de teclado (Space, F, M, flechas)
  - Indicador de tiempo
- **Cards de Previsualización PDF**:
  - Vista previa de documentos
  - Modal de visualización de PDFs
  - Opción de descarga directa
  - Animaciones hover sofisticadas

### 🚀 ENCARGO 2: Mejoras Nivel Awwwards

#### 🌐 Three.js Avanzado
- **Sistema de Partículas**: 3000+ partículas con shaders GLSL personalizados
- **Geometrías Morfantes**: Esferas icosaédricas con deformación procedural en tiempo real
- **Formas Flotantes**: Torus knots, octaedros, tetraedros con rotación independiente
- **Interacción con Mouse**: Las partículas reaccionan a la posición del cursor
- **Parallax de Scroll**: La cámara 3D responde al desplazamiento de la página
- **Shaders Personalizados**: Vertex y fragment shaders para efectos de onda y glow

#### 🎭 Sistema de Animaciones (GSAP)
- **ScrollTrigger**: Animaciones activadas por scroll con múltiples modos
- **Reveal Animations**: Fade in/up/left/right con stagger
- **Botones Magnéticos**: Efecto de atracción hacia el cursor
- **Text Animations**: Animación línea por línea del hero title
- **Gradient Shimmer**: Texto con gradiente animado
- **Parallax Effects**: Múltiples capas de profundidad

#### 🎨 Diseño Visual
- **Glass Morphism**: Tarjetas con efecto de cristal esmerilado
- **Custom Cursor**: Cursor personalizado con estados hover
- **Loading Screen**: Pantalla de carga con animación de progreso
- **Page Transitions**: Transiciones fluidas entre páginas
- **CSS Custom Properties**: Sistema de diseño completo con tokens
- **Fluid Typography**: Tipografía responsiva con clamp()

#### ⚡ Rendimiento
- **GPU Acceleration**: Transforms y opacity para animaciones de 60fps
- **Debounce/Throttle**: Optimización de eventos de scroll y resize
- **Lazy Loading Ready**: Estructura preparada para carga diferida
- **Responsive Images**: Imágenes optimizadas para diferentes viewports
- **Preconnect**: Conexiones anticipadas a recursos externos

## 🏗️ Estructura del Proyecto

```
GraphCode/
├── index.html              # Página principal
├── productos.html          # Productos con cine 2D y PDFs
├── fundadores.html         # Equipo fundador
├── teatro.html             # Teatro virtual
├── redes.html              # Redes sociales
├── contacto.html           # Formulario de contacto
├── README.md               # Este archivo
├── css/
│   └── main.css            # Estilos principales (~1200 líneas)
├── js/
│   ├── app.js              # Controlador principal
│   ├── animations.js       # Sistema de animaciones GSAP
│   ├── three-scene.js      # Escena 3D con Three.js
│   ├── theater.js          # Controlador del cine
│   ├── contact-form.js     # Validación de formularios
│   └── utils.js            # Utilidades comunes
└── assets/
    ├── videos/
    │   └── VideoSultex.mp4
    └── pdfs/
        ├── Sultex_GuionLiterario.pdf
        └── Sultex_GuionTecnico.pdf
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Three.js** | r128 | Gráficos 3D y WebGL |
| **GSAP** | 3.12.2 | Animaciones de alto rendimiento |
| **ScrollTrigger** | 3.12.2 | Animaciones basadas en scroll |
| **CSS Custom Properties** | - | Sistema de diseño |
| **ES6+ JavaScript** | - | Lógica de aplicación |

## 🚀 Cómo Ejecutar

### Método 1: Servidor Local (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/GraphCode.git
cd GraphCode

# Opción A: Python
python -m http.server 8000

# Opción B: Node.js (si tienes serve instalado)
npx serve .

# Opción C: PHP
php -S localhost:8000

# Opción D: VS Code Live Server
# Instalar extensión "Live Server" y hacer clic en "Go Live"
```

Luego abre `http://localhost:8000` en tu navegador.

### Método 2: Abrir Directamente

Simplemente abre `index.html` en tu navegador. Nota: Algunos efectos 3D pueden requerir un servidor local por restricciones CORS.

## 📁 Agregar los Archivos Multimedia

Para completar la integración del ENCARGO 1, coloca los archivos en las siguientes rutas:

```
assets/
├── videos/
│   └── VideoSultex.mp4       # Video del proyecto Sultex
└── pdfs/
    ├── Sultex_GuionLiterario.pdf
    └── Sultex_GuionTecnico.pdf
```

## ⌨️ Atajos de Teclado (Reproductor de Video)

| Tecla | Acción |
|-------|--------|
| `Espacio` | Play/Pause |
| `F` | Pantalla completa |
| `M` | Mute/Unmute |
| `←` | Retroceder 10s |
| `→` | Avanzar 10s |
| `↑` | Subir volumen |
| `↓` | Bajar volumen |

## 🎯 Características Técnicas Destacadas

### Shaders GLSL Personalizados

```glsl
// Vertex Shader - Efecto de onda en partículas
float wave = sin(pos.x * 0.01 + uTime * 0.5) * 20.0;
wave += cos(pos.y * 0.01 + uTime * 0.3) * 20.0;
pos.z += wave;

// Influencia del mouse
float mouseInfluence = smoothstep(300.0, 0.0, length(pos.xy - uMouse * 500.0));
pos.z += mouseInfluence * 100.0;
```

### Sistema de Animaciones Modular

```javascript
// Ejemplo de animación con ScrollTrigger
gsap.fromTo(element, 
  { y: 60, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  }
);
```

### Botones Magnéticos

```javascript
// Efecto magnético en botones
btn.addEventListener('mousemove', (e) => {
  const distanceX = e.clientX - centerX;
  const distanceY = e.clientY - centerY;
  gsap.to(content, {
    x: distanceX * strength * factor,
    y: distanceY * strength * factor,
    duration: 0.3
  });
});
```

## 📱 Responsividad

- **Desktop**: Experiencia completa con 3D y animaciones
- **Tablet**: Adaptaciones para touch y pantalla media
- **Mobile**: Versión optimizada sin 3D pesado para rendimiento

## 🌐 Compatibilidad de Navegadores

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

## 📈 Métricas de Rendimiento Objetivo

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**GraphCode Studio** - Innovación Digital

---

<div align="center">

**⭐ Si te gustó este proyecto, considera darle una estrella ⭐**

*Diseñado y desarrollado con ❤️ para competir en Awwwards*

</div>
