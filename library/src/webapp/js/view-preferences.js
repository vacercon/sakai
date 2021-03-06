function getViewPreferences(tool, options) {

  if (!options) options = {debug: false};

  let url = `/direct/userPrefs/key/${portal.user.id}/viewpreferences.json`;

  if (options.debug) {
    console.debug(`getViewPreferences: url=${url}`);
  }

  return new Promise((resolve, reject) => {

    fetch(url, { cache: "no-store", headers: { "Content-Type": "application/json" },})
    .then(d => d.json())
    .then(json => {

      var preferencesString = decodeURIComponent(json.data[tool]);
      if (preferencesString && preferencesString !== "undefined") {
        if (options.debug) {
          console.debug(`getViewPreferences: resolving with "${preferencesString}"`);
        }
        resolve(preferencesString);
      } else {
        if (options.debug) {
          console.debug("getViewPreferences: resolving with null");
        }
        resolve(null);
      }
    })
    .catch(error => { console.error(error); resolve(null); });
  });
}

function updateViewPreferences(tool, value, options) {

  if (!options) options = {debug: false};

  let url = `/direct/userPrefs/updateKey/${portal.user.id}/viewpreferences?${tool}=${encodeURIComponent(value)}`;

  if (options.debug) {
    console.debug(`updateViewPreferences: url=${url}`);
    console.debug(`updateViewPreference: value=${value}`);
  }

  fetch(url, { method: "PUT", cache: "no-store" })
  .catch(error => console.error(
                    `Failed to update view preferences for tool '${tool}'. Take a look at the server logs?`));
}

// Until Chrome Edge comes out, we will be pulling this in old school. Later though ...
//export {getViewPreferences, updateViewPreferences};
