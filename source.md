<section id="themes">
	<h2>Themes</h2>
		<p>
			Set your presentation theme: <br>
			<!-- Hacks to swap themes after the page has loaded. Not flexible and only intended for the reveal.js demo deck. -->
                        <a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/black.css'); return false;">Black (default)</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/white.css'); return false;">White</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/league.css'); return false;">League</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/sky.css'); return false;">Sky</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/beige.css'); return false;">Beige</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/simple.css'); return false;">Simple</a> <br>
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/serif.css'); return false;">Serif</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/blood.css'); return false;">Blood</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/night.css'); return false;">Night</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/moon.css'); return false;">Moon</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/solarized.css'); return false;">Solarized</a>
		</p>
</section>

H:

# Rendering

Visual Computing

H:

# Outline

1. Introduction: the problem
2. Ray-tracing approach
3. Rasterization approach
4. Final thoughts

H:

## Introduction: Alberti's Veil
### Linear perspective

<figure>
    <img height='400' src='fig/durer2.gif' />
    <figcaption>[Dürer's Alberti Veil](http://visualcomputing.github.io/Cognitive)</figcaption>
</figure>

V:

## Introduction: Virtual camera model
### Representation

<figure>
    <img height='400' src='fig/pinholecam.png' />
    <figcaption>Non inversion of the rendered image</figcaption>
</figure>

V:

## Introduction: Virtual camera model
### Frustum

<figure>
    <img height='400' src='fig/frustum.png'/>
    <figcaption>Near and far clipping frustum planes</figcaption>
</figure>

V:

## Introduction: Virtual camera model
### Image plane

<figure>
    <img height='400' src='fig/clippingplanescanvas.png'/>
    <figcaption>Various valid canvas positions</figcaption>
</figure>

V:

## Introduction: Virtual camera model
### Image plane

<figure>
    <img height='400' src='fig/canvascoordinates.png'/>
    <figcaption>Positioning the canvas at the near plane</figcaption>
</figure>

V:

## Introduction: Virtual camera model
### Frustum

<figure>
    <img height='400' src='fig/frustumsideview.png'/>
    <figcaption>Frustum side view</figcaption>
</figure>

V:

## Introduction: Virtual camera model
### Challenges

> 1. Spatial coherence -> Visibility
<p>
> 2. Visual appealing -> Shading

V:

## Introduction: Virtual camera model
### Challenges: Visibility
#### Geometry related

<video width="400" height="400" controls data-autoplay loop src="vid/coordinate_system_no_depth.ogv"></video>

V:

## Introduction: Virtual camera model
### Challenges: Shading
#### Physics related

<figure>
    <img height='400' src='fig/rendering_eq.png'/>
    <figcaption>[Rendering equation](https://en.wikipedia.org/wiki/Rendering_equation)</figcaption>
</figure>

N:

integral equation in which the equilibrium radiance leaving a point is given as the sum of emitted plus reflected radiance under a geometric optics approximation

H:

## Raster approach: strategy
### Object centric

<figure>
    <img height='400' src='fig/rasterization.png'/>
    <figcaption>Perspective projection of points</figcaption>
</figure>

V:

## Raster approach: strategy
### Object centric

<figure>
    <img height='400' src='fig/rasterization1.png'/>
    <figcaption>Perspective projection of a point</figcaption>
</figure>

V:

## Raster approach: strategy
### Object centric

```processing
for (each point in scene) {
transform point from world space to camera space;
perform perspective divide (x/-z, y/-z);
  if (point lies within canvas boundaries) {
    convert coordinates to NDC space;
    convert coordinates from NDC to raster space;
    record point in image;
  }
}
```

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms

1. [Painter's algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm)
1. [Binary space partioning (BSP)](https://en.wikipedia.org/wiki/Binary_space_partitioning)
1. [Warnock algorithm](https://en.wikipedia.org/wiki/Warnock_algorithm)
1. [Z-Buffering](https://en.wikipedia.org/wiki/Z-buffering)

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Painter's algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm)

<figure>
    <img height='400' src='fig/painter_algorithm.png'/>
    <figcaption>Draw distant objects first</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Binary space partioning (BSP)](https://en.wikipedia.org/wiki/Binary_space_partitioning)

<figure>
    <img height='400' src='fig/bsp_input.gif'/>
    <figcaption>Input scene</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Binary space partioning (BSP)](https://en.wikipedia.org/wiki/Binary_space_partitioning)

<figure>
    <img height='400' src='fig/bsp1.gif'/>
    <figcaption>(Offline) subdivision step</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Binary space partioning (BSP)](https://en.wikipedia.org/wiki/Binary_space_partitioning)

<figure>
    <img height='400' src='fig/bsp2.gif'/>
    <figcaption>(Offline) subdivision step</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Binary space partioning (BSP)](https://en.wikipedia.org/wiki/Binary_space_partitioning)

<figure>
    <img height='400' src='fig/bsp.gif'/>
    <figcaption>BSP Tree</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Binary space partioning (BSP)](https://en.wikipedia.org/wiki/Binary_space_partitioning)

<figure>
    <img height='400' src='fig/bsp_scene.jpg'/>
    <figcaption>(Runtime) BSP visit</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Warnock algorithm](https://en.wikipedia.org/wiki/Warnock_algorithm)

<figure>
    <img height='400' src='fig/warnock1.png'/>
    <figcaption>Polygon visibility cases: a) polygon fills the viewport, b) polygon partially and c) completely visible, d) polygon invisible</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Warnock algorithm](https://en.wikipedia.org/wiki/Warnock_algorithm)

<figure>
    <img height='400' src='fig/warnock.png'/>
    <figcaption>Subdivision step example</figcaption>
</figure>

V:

## Raster approach: visibility
### [Hidden surface removal (HSR)](https://en.wikipedia.org/wiki/Hidden_surface_determination) algorithms
#### [Z-Buffering](https://en.wikipedia.org/wiki/Z-buffering)

<figure>
    <img height='400' src='fig/zbuffer.png'/>
    <figcaption>Zbuffer data</figcaption>
</figure>

V:

## Raster approach: shading

<!– 
Desarrollar el tema que se encuentra aca (en slides verticales, i.e., empleando el tag 'V:'):
https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage
–>

H:

## Ray-tracing approach: strategy
### Image centric

<figure>
    <img height='400' src='fig/ray_trace_diagram.png'/>
    <figcaption>Casting rays into a scene</figcaption>
</figure>

V:

## Ray-tracing approach: strategy
### Image centric

<figure>
    <img height='400' src='fig/ballsrender.png'/>
    <figcaption>Photorealism</figcaption>
</figure>

V:

## Ray-tracing approach: strategy
### Image centric

```processing
for (each pixel in the image) {
  // step 1
  build a camera ray: trace line from current pixel location to camera's aperture;
  // step 2
  cast ray into the scene;
  // step 3
  if (ray intersects an object) {
    set current pixel's color with object's color at the intersection point;
  } else {
    set current pixel's color to black;
  }
}
```

V:

## Ray-tracing approach: visibility

<figure>
    <img height='400' src='fig/ray-tracing-points.png'/>
    <figcaption>Visibility computation</figcaption>
</figure>

V:

## Ray-tracing approach: visibility

```processing
for (each pixel in the image) {
  // step 1
  build a camera ray: trace line from current pixel location to camera's aperture;
  // step 2
  cast ray into the scene;
  // step 3
  for (each object in the scene) {
    set current pixel's color with closest object's color at the intersection point;
  }
}
```

V:

## Ray-tracing approach: shading

<!–
Desarrollar el tema que se encuentra aca (en slides verticales, i.e., empleando el tag 'V:'):
https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-overview
desde la seccion: 'Casting Rays into the scene'

el tema para seguirla seria este de aca:
https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-overview/light-transport-ray-tracing-whitted
pero no el Lunes, sino quizas mas adelante
–>

H:

## Final thoughts

H:

## References

1. [Introduction to rendering](http://www.scratchapixel.com/lessons/3d-basic-rendering/rendering-3d-scene-overview/)
1. [Rasterization intro?](http://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation)
1. [Rasterization details?](http://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage)
1. [2D cross-product](https://www.gamedev.net/forums/topic/289972-cross-product-of-2d-vectors/)
1. [Introduction to ray tracing](http://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing)
1. [Ray tracing rendering technique overview](http://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-overview)
1. [Ray Tracing: Rendering a Triangle](http://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates)
