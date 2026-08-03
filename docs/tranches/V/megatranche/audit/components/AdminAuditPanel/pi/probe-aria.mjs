async (page) => {
    // Prove the ARIA rule the panel's loading plate depends on:
    // aria-label on a role-less <div> (role=generic) is name-prohibited.
    await page.evaluate(() => {
        const host = document.createElement("div");
        host.id = "ax-probe";
        host.innerHTML = `
          <div aria-label="Loading audit log" data-probe="generic-div">
            <span>inner</span>
          </div>
          <div role="status" aria-label="Loading audit log" data-probe="status-div"></div>`;
        document.body.appendChild(host);
    });
    const snap = await page.locator("#ax-probe").ariaSnapshot();
    await page.evaluate(() => document.getElementById("ax-probe")?.remove());
    return snap;
}
