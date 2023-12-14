const vendorAux = process.env.VTEX_APP_ID?.split(".")[0];
let globalUrl: string;
if (window.location.host.includes("--")) {
  const workSpaceAux = window.location.host.split("--")[0]
  //Se debe linkear primero el microservicio al workspace dede donde se esta accediendo
  globalUrl = `https://${workSpaceAux}--${vendorAux}.myvtex.com`;
}else{
  globalUrl = `https://${vendorAux}.myvtex.com`;
}
export {globalUrl};
