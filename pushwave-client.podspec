require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "pushwave-client"
  s.version      = package["version"]
  s.summary      = package["description"] || "PushWave Client SDK"
  s.homepage     = package["homepage"] || "https://github.com/luruk-hai/pushwave-client"
  s.license      = package["license"] || "MIT"
  s.author       = package["author"] || { "PushWave" => "support@pushwave.dev" }
  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => package["repository"] ? package["repository"]["url"] : "https://github.com/luruk-hai/pushwave-client.git",
                     :tag => "v#{s.version}" }

  s.source_files  = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc  = true
  s.swift_version = "5.0"
  s.frameworks    = "DeviceCheck"
  s.dependency    "React-Core"
end
