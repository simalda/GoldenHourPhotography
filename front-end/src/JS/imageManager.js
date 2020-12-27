export function importAll() {
  const r = require.context(
    "../static/photos/galery/",
    false,
    /\.(png|jpe?g|svg)$/
  );
  let webpackList = r.keys().map(r);
  return webpackList.map((module) => module["default"]);
}
