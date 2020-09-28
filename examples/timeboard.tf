resource "datadog_dashboard" "tb" {
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
        conditional_formats {
          comparator = "<"
          value      = 1
          palette    = "white_on_red"
        }
        conditional_formats {
          comparator = ">="
          value      = 1
          palette    = "white_on_green"
        }
      }
      title = "Avg of datadog.agent.running over *"
      time = {
      }
      autoscale = true
      precision = 2
    }
  }
  template_variable {
    name    = "major"
    default = "*"
    prefix  = "agent_version_major"
  }
  template_variable {
    name    = "minor"
    default = "*"
    prefix  = "agent_version_minor"
  }
  template_variable {
    name    = "patch"
    default = "*"
    prefix  = "agent_version_patch"
  }
  layout_type  = "ordered"
  is_read_only = false
  notify_list  = []
  template_variable_preset {
    name = ">= 7"
    template_variable {
      name  = "major"
      value = "7"
    }
  }
  template_variable_preset {
    name = "Latest"
    template_variable {
      name  = "major"
      value = "7"
    }
    template_variable {
      name  = "minor"
      value = "21"
    }
    template_variable {
      name  = "patch"
      value = "1"
    }
  }
}
