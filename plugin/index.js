const {
  createRunOncePlugin,
  withAppBuildGradle,
  withProjectBuildGradle,
} = require("@expo/config-plugins");

const pkg = require("../package.json");

const PLAY_INTEGRITY_DEP = 'implementation("com.google.android.play:integrity:1.6.0")';

function injectDependency(contents) {
  if (contents.includes(PLAY_INTEGRITY_DEP)) return contents;
  return contents.replace(/dependencies\s?{[^}]*}/, (match) => {
    if (match.includes(PLAY_INTEGRITY_DEP)) return match;
    return match.replace(/dependencies\s?{/, `dependencies {\n        ${PLAY_INTEGRITY_DEP}\n`);
  });
}

function withPushwaveAndroid(config) {
  // Inject into module-level build.gradle / build.gradle.kts
  config = withAppBuildGradle(config, (config) => {
    const { language, contents } = config.modResults;
    if (language !== "groovy" && language !== "kts") return config;

    config.modResults.contents = injectDependency(contents);
    return config;
  });

  // Inject into project-level build.gradle.kts (some setups place deps here)
  config = withProjectBuildGradle(config, (config) => {
    const { language, contents } = config.modResults;
    if (language !== "kts") return config;

    config.modResults.contents = injectDependency(contents);
    return config;
  });

  return config;
}

const withPushwaveClient = (config) => {
  config = withPushwaveAndroid(config);
  return config;
};

module.exports = createRunOncePlugin(
  withPushwaveClient,
  pkg.name,
  pkg.version
);
