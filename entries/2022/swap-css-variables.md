---
title: Swapping Two CSS Variables
draft: true
---

<figure>
<figcaption>missing.css, file src/40-aria.css, line 85, revision c6c5f1a</figcaption>

~~~css
.parent {
    --fg: red;
    --bg: white;

    color: var(--fg);
    background: var(--bg);
}

.child {
    --temp-fg: var(--bg);
    --temp-bg: var(--fg);


    color: var(--temp-fg);
    background: var(--temp-bg);
}

.child > * {
    --bg: var(--temp-bg);
    --fg: var(--temp-bg);
}
~~~

</figure>

<figure>
<figcaption>missing.css, file src/40-aria.css, line 85, revision c6c5f1a</figcaption>

~~~css
& [role=option].active {
    --temporary-bg: var(--accent);
    --temporary-fg: var(--bg);
    --temporary-accent: parent-var(--muted-accent);
    --temporary-muted-accent: parent-var(--box-bg);

    background: var(--temporary-bg);
    color: var(--temporary-fg);
    
    & > * {
        --bg: var(--temporary-bg);
        --fg: var(--temporary-fg);
        --accent: var(--temporary-accent);
        --muted-accent: var(--temporary-muted-accent);
    }
~~~

</figure>
