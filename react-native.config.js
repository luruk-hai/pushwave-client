module.exports = {
  dependency: {
    platforms: {
      ios: {
        podspecPath: "pushwave-client.podspec",
      },
      android: {
        sourceDir: "android",
        packageImportPath: "import com.pushwaveclient.PushwaveAttestationPackage;",
        packageInstance: "new PushwaveAttestationPackage()",
      },
    },
  },
};
