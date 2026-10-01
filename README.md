# 🧾 Caja Rápida

**Mini POS de facturación e inventario para equipos de seguridad (CCTV y alarmas).**
Factura en segundos, mira bajar el stock en tiempo real y recibe alertas cuando un producto se agota.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Sin dependencias](https://img.shields.io/badge/dependencias-0-0f9d75)
![Responsive](https://img.shields.io/badge/responsive-sí-14213d)

### [🔗 Ver demo en vivo](https://cajastocksimulator.netlify.app/)

<!-- Reemplaza con una captura real: docs/captura.png -->
<img width="1920" height="945" alt="image" src="https://github.com/user-attachments/assets/84312394-ed03-42d9-9e4a-e7c22eb1c4b9" />

</div>

---

## ¿Qué es?

Caja Rápida es una demo de un punto de venta pensado para un negocio que vende e instala **cámaras de seguridad, DVR, sensores y paneles de alarma smart**. Resuelve el flujo básico de cualquier mostrador:

1. Eliges productos del catálogo.
2. Armas la factura con subtotal, IVA y total.
3. Facturas, y el inventario se descuenta solo.
4. Si un producto llega a cero, el sistema avisa y lo deja marcado.

Es un proyecto pequeño a propósito: muestra cómo organizo la lógica, el estado y la interfaz sin depender de un framework ni de un servidor.

## Funcionalidades

| | |
|---|---|
| 🛒 **Facturación** | Carrito con cantidades editables, subtotal, IVA 19 % y total en COP. Consecutivo de factura (`#0001`, `#0002`…). |
| 📦 **Inventario en vivo** | El stock se descuenta al facturar. No permite vender más unidades de las que hay. |
| 🔔 **Alertas de agotados** | Aviso emergente al agotarse un producto, y una campana con un punto rojo mientras haya referencias en cero. Al abrirla muestra la lista en un modal. |
| ↕️ **Ordenamiento** | Por nombre (A→Z / Z→A) o por cantidad en stock (menor→mayor / mayor→menor), con orden alfabético correcto en español. |
| 📊 **Indicadores** | Ventas del día, número de facturas y productos con stock bajo. |
| 🖨️ **Impresión de factura** | Genera una factura en formato tirilla (80 mm) lista para imprimir o guardar como PDF. Si hay un carrito abierto imprime un borrador; si no, la última factura emitida. |
| 💾 **Persistencia local** | Los datos se guardan en el navegador con `localStorage`; botón para reiniciar la demo. |
| 🌗 **Modo oscuro** | Se adapta automáticamente a la preferencia del sistema. |
| ♿ **Accesibilidad básica** | Foco visible con teclado, etiquetas `aria`, `<dialog>` nativo y respeto de `prefers-reduced-motion`. |

## Stack

- **HTML5** semántico
- **CSS3** con variables, grid, flexbox y media queries (responsive y `print`)
- **JavaScript** vanilla (ES6+), sin librerías ni build
- Tipografía [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) vía Google Fonts, con respaldo a fuentes del sistema

## Estructura

```
caja-rapida/
├── index.html   # Estructura de la página y el modal
├── styles.css   # Estilos, tema claro/oscuro y estilos de impresión
├── app.js       # Catálogo, estado, facturación, orden, alertas e impresión
└── README.md
```

## Ejecutar en local

No necesita instalación. Elige una opción:

```bash
# 1) Abrir directamente
# Doble clic en index.html

# 2) Servidor local (opcional)
npx serve .
# o
python3 -m http.server 8000
```

## Despliegue gratuito

**GitHub Pages**
1. Sube el proyecto a un repositorio público.
2. Ve a *Settings → Pages*.
3. En *Source* elige la rama `main` y la carpeta `/ (root)`.
4. En un par de minutos queda en `https://TU-USUARIO.github.io/caja-rapida/`.

**Netlify Drop:** entra a [app.netlify.com/drop](https://app.netlify.com/drop) y arrastra la carpeta.

## Decisiones técnicas

- **Sin framework:** para una demo de este tamaño, JavaScript vanilla carga más rápido y se puede leer completo en pocos minutos.
- **Estado único:** inventario, consecutivo y ventas viven en un solo objeto que se serializa en `localStorage`, con validación al leerlo por si los datos guardados no coinciden con el catálogo.
- **Factura de impresión separada:** la tirilla se arma en un bloque propio que solo se muestra con `@media print`, en vez de imprimir la pantalla. Así el resultado es limpio y no depende del estado visual de la interfaz.
- **IVA incluido en el precio de lista:** el subtotal se calcula dividiendo el total entre 1,19, que es como se ve en el comercio minorista.

## Alcance y limitaciones

Esta es una **demo de interfaz y lógica**, no un sistema listo para producción:

- No emite facturación electrónica ante la DIAN.
- Los datos viven solo en el navegador de quien la usa (sin base de datos ni usuarios).
- Los productos y precios son ficticios.

## Hoja de ruta

- [ ] API REST con **Java + Spring Boot** y base de datos **MySQL** (arquitectura Controller / Service / DAO)
- [ ] Migrar el frontend a **Angular** con componentes y servicios
- [ ] Gestión de productos (crear, editar, eliminar)
- [ ] Historial de ventas con filtros por fecha
- [ ] Reporte de ventas en PDF/Excel
- [ ] Login y roles (administrador / vendedor)
- [ ] Integración con facturación electrónica

## Autor

**Luis Morales** · Desarrollador Frontend / Full Stack
Cali, Valle del Cauca, Colombia

📧 nandoarmo01@gmail.com · 📱 310 406 3402
[LinkedIn](#) · [GitHub](#) · [Portafolio](#)

---

<div align="center">
<sub>Proyecto de demostración. Los productos, precios y datos son ficticios.</sub>
</div>
