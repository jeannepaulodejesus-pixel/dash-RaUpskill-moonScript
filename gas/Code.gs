/**
 * PressRun: From Routine to Run, served as an Apps Script web app.
 *
 * The page is static and computes every example in the browser from labelled
 * sample data, so this project uses no Workspace services and requests no
 * OAuth scopes: visitors are never asked to authorize anything.
 *
 * Deploy: Deploy > New deployment > Web app.
 *   Execute as: User accessing the web app
 *   Who has access: your domain, or Anyone with the link
 */

/** Serves the page. Query parameters (for example ?mode=present) are read on the client. */
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('PressRun: From Routine to Run')
    // HtmlService ignores a <meta name="viewport"> in the file; it must be added here.
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    // Uncomment to allow embedding in Google Sites or another page.
    // .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    ;
}

/** Inlines another HTML file of this project (Styles, Scripts) into the template. */
function include(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}
