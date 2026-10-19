SERVED MODEL: claude-opus-5-5[1m]

# X.KF.W13T.k3 — live readings (kf dev :5173, headless chromium, value.js playwright 1.60.0)

## G-KFW13T-7 · G-KFW13T-1 — `node KF-W13T-k-dock-probe.mjs <tag> .` (unmodified banked probe)

BEFORE (`k3-before`, kf `09846d75`, screenshots `KF-W13T-k-k3-before-*.png`):

```
1440x900 #/ [612,43,828,99] out= 0 coll= 0 wrap [] []
1440x900 #/cube [519,43,921,99] out= 0 coll= 0 wrap [] []
768x1024 #/ [287,30,481,86] out= 0 coll= 0 wrap [] []
768x1024 #/cube [201,30,567,86] out= 0 coll= 0 wrap [] []
390x844 #/ [101,30,289,86] out= 0 coll= 1 wrap [] ["@mbabb menu x Share animation"]
390x844 #/cube [39,30,351,116] out= 0 coll= 3 wrap [] ["Controls tab x Share animation","Controls panel x Show keyboard shortcuts","Controls panel x Switch to dark mode"]
```

AFTER run 1 (`k3-after1`) and run 2 (`k3-after2`), kf `cfecfbce` — identical, screenshots `KF-W13T-k-k3-after{1,2}-*.png`:

```
1440x900 #/ [545,43,895,99] out= 0 coll= 0 wrap [] []
1440x900 #/cube [452,43,988,99] out= 0 coll= 0 wrap [] []
768x1024 #/ [220,30,548,86] out= 0 coll= 0 wrap [] []
768x1024 #/cube [134,30,634,86] out= 0 coll= 0 wrap [] []
390x844 #/ [39,30,351,130] out= 0 coll= 0 wrap [] []
390x844 #/cube [39,30,351,130] out= 0 coll= 0 wrap [] []
```

## R-k-1 behaviour — `node KF-W13T-k3-chrome-probe.mjs` (×2, identical)

```
1440x900 ribbon=0 inDock={"Share animation":1,"Show keyboard shortcuts":1,"/Switch to (dark|light) mode/":1} outsideDock=0 dialog(?)=1 dialog(click)=1 sharePopover=1
768x1024 ribbon=0 inDock={"Share animation":1,"Show keyboard shortcuts":1,"/Switch to (dark|light) mode/":1} outsideDock=0 dialog(?)=1 dialog(click)=1 sharePopover=1
390x844 ribbon=0 inDock={"Share animation":1,"Show keyboard shortcuts":1,"/Switch to (dark|light) mode/":1} outsideDock=0 dialog(?)=1 dialog(click)=1 sharePopover=1
```

## ESC-k2-1 pair 2 behaviour — `node KF-W13T-k3-pane-probe.mjs`

```
390x844 layout0=controls-layout--closed pressed0=null -> layout1=controls-layout--open pressed1=true pageerrors=0 []
1440x900 layout0=controls-layout--open pressed0=true -> layout1=controls-layout--closed pressed1=null pageerrors=0 []
```
