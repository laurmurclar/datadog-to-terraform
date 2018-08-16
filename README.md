# Datadog to Terraform Converter
Converts Datadog monitor JSON into Terraform alarm code. [Install it here.](https://chrome.google.com/webstore/detail/datadog-to-terraform-conv/lafmglpipgongjmbbjngmboifpaodemk)

### How to Use
1. Create your monitor (but don't save) in the Datadog UI and copy the monitor JSON.
1. Open the extension, fill in the resource name and paste in the monitor JSON.
1. Paste the resulting code into your terraform file and run `terraform fmt`

And that's it.

Click to enlarge:
![](http://g.recordit.co/Bk7jSES5E7.gif)

### Next steps
If you're looking to contribute, I have some ideas for what to work on next:
- [ ] Error handling (nothing happens right now if the conversion fails)
- [ ] Testing
- [ ] Add an "Export to Terraform" button into the Datadog UI
- [ ] Add an option to use Intercom defaults for things like `notify_no_data`
- [ ] Format the output nicely
- [ ] Clean up the code (could restructure or DRY things up a bit, etc.)
- [ ] Make this repo open-source
- [ ] Publish the extension in the Chrome App store (not just to Intercomrades)
- [ ] Make this available in other browsers, editors, etc.
