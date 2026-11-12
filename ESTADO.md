# Estado de HormigonCalc

**Estado al 2026-11-12, antes de la mudanza al Mac.** Lo escribió la sesión 22/32 de la mudanza
(protocolo en `C:\Cariolaspace\CariolaConfig\Cariolaspace\PROTOCOLO-RESPALDO-PROYECTOS.md`).

## En una línea

App 100 % cliente (Next 15.2.9, Tailwind **v3**, Plotly con `ssr:false`): laboratorio de modelos
constitutivos del hormigón y 6 calculadoras de vigas en flexión (M1-M6). **Terminada y en
producción**, sin cambios de la app desde el 2026-05-06. Es el único proyecto del catálogo de
Vectium que sigue "vivo". La decisión del 2026-07-23 es **mantenerla, no archivarla**.

- Fuente de verdad del diseño: `HORMIGONCALC_MASTER.md` (su §1 todavía nombra la ruta vieja
  `C:\Universidad\hormigon`; es histórica).
- Ficha con el contexto que no va al repo: `C:\Cariolaspace\CariolaConfig\Cariolaspace\PROYECTOS\hormigon\FICHA.md`.
- 🔴 **No migrar a Tailwind v4**: la paleta de zonas de falla depende de `tailwind.config.ts`.

## Git (2026-11-12)

- `main` = `origin/main`, árbol limpio, sin stash, sin worktrees, sin ramas `claude/*`.
- Repo `CariolaFlex/hormigon-armado` **público**: nada de secretos en lo que se commitee.
  Sin GitHub Actions, sin PR, Dependabot apagado.
- `.claude/settings.local.json` está versionado (solo permisos de Windows de marzo, sin secretos).
- Commits con `cariolaflex@gmail.com`: fijarlo en el `git config` del Mac.

## Lo que usa fuera del repo

- `vectium.cl` (repo `vectium-web`) enlaza `https://hormigon-armado.vercel.app` con una captura
  (`public/proyectos/hormigoncalc/portada.webp`, agregada el 2026-11-11). **Si cambia la URL, se
  rompe ese enlace.**
- El proyecto `empleo` decidió (V51, 2026-09-21) **no fijar** este repo en el perfil de GitHub ni
  mencionarlo en el CV: es de ingeniería civil (REGLAS §1 de `empleo`).

## Conexiones y cómo reconectar en el Mac

| Servicio | Qué hay | Verificado el 2026-11-12 |
|---|---|---|
| GitHub | `CariolaFlex/hormigon-armado`, rama `main` | `gh repo view`: PUBLIC, sin archivar |
| Vercel | Proyecto `hormigon-armado` (`prj_mvhhZD6oLlWJoOPaZe88KCiIveY9`), equipo `andres-cariolas-projects` (cuenta cariolaflex), enlazado a GitHub, rama de producción `main`, Node 24.x | Producción = commit `e80fab2` (2026-11-07, READY). `/`, `/flexion/rectangular`, `/materiales/hormigon/laboratorio` y `/cargas/momentos-cortantes` responden 200 |
| Dominio | Solo `hormigon-armado.vercel.app` | Sin dominio propio |
| Variables de entorno | **Ninguna** (ni en Vercel ni en local) | No hay `.env*` |
| Crons, Supabase, Firebase, n8n, Drive | **Nada** | No hay `docs/CONEXIONES.md` porque no hay nada que reconectar (las demos del catálogo que tenían nube sí lo tienen) |

- **Los push a `main` sí despliegan.** El despliegue del 2026-11-07 salió READY, aunque desde el
  2026-11-03 los push a los proyectos privados de este equipo quedan BLOCKED. Este repo es
  público y no le pasó. Un push que solo toca documentos no cambia la app.
- No hay `.vercel/` local: la carpeta no está enlazada por CLI y no hace falta.
- Pendiente de la Fase 00, tarea 3.5 (`FASE-00-CUENTAS-Y-ENTORNO.md`): pasar el proyecto al equipo
  `vectium`. Hacerlo **transfiriéndolo**, para conservar la URL `hormigon-armado.vercel.app` que
  enlaza vectium.cl.

Para levantarlo en el Mac:

```bash
git clone https://github.com/CariolaFlex/hormigon-armado.git
cd hormigon-armado
npm install
npm run dev
```

Si algún día hace falta la CLI: `vercel link --scope andres-cariolas-projects` (con la cuenta
cariolaflex o su token). No hay `vercel env pull` porque no hay variables.

## Fuera de git

- Ignorado: solo `next-env.d.ts` (se regenera con `next dev`/`next build`). No hay `node_modules`
  ni `.next` en disco.
- `estudio/Hormigón Armado/` (13 `.md`, la síntesis del ramo que escribió Andrés) **sí** está en
  git. Los PDFs del profesor se sacaron el 2026-07-23 y se recuperan con
  `git checkout dcd2d42 -- estudio`.

## Mac

- Nada depende de Windows: no hay scripts `.ps1` ni rutas `C:\` en el código.
- `.claude/settings.local.json` trae permisos de Windows (`taskkill`, `netstat`, una ruta vieja de
  memoria): en el Mac no sirven, pero no estorban.
- La carpeta del acento (`estudio/Hormigón Armado`) se clona bien en macOS; en git aparece citada
  y escapada (`Hormig\303\263n`), así que hay que buscarla sin anclar la extensión.

## Pendiente (no bloquea nada)

- Fase 00, tarea 3.5: transferir el proyecto de Vercel al equipo `vectium` (ver arriba).
- Las preguntas de la capa 3 de la ficha siguen sin respuesta escrita (si el MVP se da por
  cerrado, si el "potencial SaaS" de `HORMIGONCALC_MASTER.md` §1 es real y el checklist de
  `estudio/…/PLAN_MAESTRO.md`, con los 10 ítems en 🔲 aunque los `.md` existen).
- No hay transcripción de los 3 chats de construcción (marzo a mayo, en `C:\Universidad\hormigon`).
  Lo que se sabe de ellos está en la ficha y en la memoria del proyecto.
