# Datadog to Terraform Converter

Converts Datadog monitor and dashboard JSON into Terraform alarm code.

## Installation

[Chrome Extension](https://chrome.google.com/webstore/detail/datadog-to-terraform-conv/lafmglpipgongjmbbjngmboifpaodemk) | [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/datadog-to-terraform-converter/)

## How to Use

1. Create your monitor or dashboard in the Datadog UI and copy the JSON.
1. Open the extension, fill in the resource name and paste in the JSON.
1. Paste the resulting code into your terraform file and run `terraform fmt` (you can automate this with editor plugins)

And that's it.

Click to enlarge:
![](http://g.recordit.co/Bk7jSES5E7.gif)

---

## Contributing

We'd love for folks to contribute! Feel free to add your own ideas or take a look at the issues for inspiration. The [Contributing Guide](CONTRIBUTING.md) explains development setup and the release process.
