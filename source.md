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

Jean Pierre Charalambos

H:

# Outline

1. Introduction
2. Ray-tracing overview
3. Rasterization overview
4. Triangle rasterization

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
### Frustum

<figure>
    <img height='400' src='fig/frustumsideview.png'/>
    <figcaption>Frustum side view</figcaption>
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

## Introduction: Visibility algorithms
### Rasterization

<figure>
    <img height='400' src='fig/rasterization.png'/>
    <figcaption>Perspective projection of points</figcaption>
</figure>

V:

## Introduction: Visibility algorithms
### Rasterization

<figure>
    <img height='400' src='fig/rasterization1.png'/>
    <figcaption>Perspective projection of a point</figcaption>
</figure>

V:

## Introduction: Visibility algorithms
### Rasterization is object centric

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

## Introduction: Visibility algorithms
### Ray-tracing

<figure>
    <img height='400' src='fig/ray_trace_diagram.png'/>
    <figcaption>Casting rays into a scene</figcaption>
</figure>

V:

## Introduction: Visibility algorithms
### Ray-tracing

<figure>
    <img height='400' src='fig/ballsrender.png'/>
    <figcaption>Photorealism</figcaption>
</figure>

V:

## Introduction: Visibility algorithms
### Ray-tracing is image centric
#### Pseudocode

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

H:

## Ray-tracing overview

H:

## Rasterization overview

H:

## Triangle rasterization


H:

## References

1. [Introduction to rendering](http://www.scratchapixel.com/lessons/3d-basic-rendering/rendering-3d-scene-overview/)
1. [Rasterization intro?](http://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation)
1. [Rasterization details?](http://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage)
1. [2D cross-product](https://www.gamedev.net/forums/topic/289972-cross-product-of-2d-vectors/)
1. [Introduction to ray tracing](http://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing)
1. [Ray tracing rendering technique overview](http://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-overview)
1. [Ray Tracing: Rendering a Triangle](http://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates)
