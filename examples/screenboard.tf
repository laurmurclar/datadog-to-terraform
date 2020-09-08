resource "datadog_dashboard" "hi" {
  title       = "Laura's Screenboard 7 Sep 2020 13:18"
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
      title_size  = "16"
      title_align = "left"
      time = {
      }
      show_legend = false
    }
    layout = {
      x      = 17
      y      = 15
      width  = 47
      height = 15
    }
  }
  widget {
    heatmap_definition {
      request {
        q = "avg:system.cpu.user{*}"
        style {
          palette = "dog_classic"
        }
      }
      title       = "Avg of system.cpu.user over *"
      title_size  = "16"
      title_align = "left"
      show_legend = false
      time = {
      }
    }
    layout = {
      x      = 78
      y      = 7
      width  = 47
      height = 15
    }
  }
  widget {
    query_value_definition {
      request {
        q          = "avg:datadog.agent.running{*}"
        aggregator = "avg"
      }
      title       = "Avg of datadog.agent.running over *"
      title_size  = "16"
      title_align = "left"
      time = {
      }
      autoscale = true
      precision = 2
    }
    layout = {
      x      = 8
      y      = 35
      width  = 47
      height = 15
    }
  }
  layout_type  = "free"
  is_read_only = false
  notify_list  = []
}
