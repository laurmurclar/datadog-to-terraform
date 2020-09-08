resource "datadog_dashboard" "hi" {
  title       = "Laura's Timeboard 21 Aug 2020 16:30"
  description = ""
  widget {
    timeseries_definition {
      request {
        q            = "avg:system.cpu.user{*}"
        display_type = "line"
        style {
          palette    = "dog_classic"
          line_type  = "solid"
          line_width = "normal"
        }
      }
      yaxis {
        label        = ""
        scale        = "linear"
        min          = "auto"
        max          = "auto"
        include_zero = true
      }
      title       = "Avg of system.cpu.user over *"
      show_legend = false
      legend_size = "0"
    }
  }
  widget {
    query_value_definition {
      request {
        q          = "avg:datadog.agent.running{*}"
        aggregator = "avg"
      }
      title     = "Avg of datadog.agent.running over *"
      autoscale = true
      precision = 2
    }
  }
  layout_type  = "ordered"
  is_read_only = false
  notify_list  = []
}
