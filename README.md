# Datadog to Terraform Converter
Converts Datadog monitor JSON into Terraform alarm code.

### How to Use
1. Create your monitor (but don't save) in the Datadog UI and copy the monitor JSON.
1. Open the extension, fill in the resource name and paste in the monitor JSON.
1. Paste the resulting code into your terraform file and run `terraform fmt`

And that's it.

Click to enlarge:
![](http://g.recordit.co/Bk7jSES5E7.gif)
