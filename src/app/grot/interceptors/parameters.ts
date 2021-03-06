export const Parameters = [
  {
    "name": "project",
    "displayName": "Project",
    "type": "text",
    "default": "project",
    "required": "true"
  },
  {
    "name": "problem",
    "displayName": "Problem",
    "type": "select",
    "default": "planestress",
    "required": "true",
    "options": [
      {
        "name": "Planestress",
        "value": "planestress"
      },
      {
        "name": "Planestrain",
        "value": "planestrain"
      }
    ]
  },
  {
    "name": "material",
    "displayName": "Material",
    "type": "select",
    "default": "steel",
    "required": "true",
    "options": [
      {
        "name": "Steel",
        "value": "steel"
      },
      {
        "name": "Aluminium",
        "value": "alu"
      },
      {
        "name": "Titan",
        "value": "titan"
      }
    ]
  },
  {
    "name": "unit",
    "displayName": "Unit",
    "type": "select",
    "default": "cm",
    "required": "true",
    "options": [
      {
        "name": "NM",
        "value": "nm"
      },
      {
        "name": "UM",
        "value": "um"
      },
      {
        "name": "MM",
        "value": "mm"
      },
      {
        "name": "CM",
        "value": "cm"
      },
      {
        "name": "DM",
        "value": "dm"
      },
      {
        "name": "M",
        "value": "m"
      },
      {
        "name": "KM",
        "value": "km"
      }
    ]
  },
  {
    "name": "scale",
    "displayName": "Scale",
    "type": "number",
    "required": "true",
    "default": "1"
  },
  {
    "name": "thickness",
    "displayName": "Thickness",
    "type": "number",
    "required": "true",
    "default": "1"
  },
  {
    "name": "load",
    "displayName": "Force direction (X/Y)",
    "type": "load",
    "required": "true",
    "default": "0 -800 f0f"
  },
  {
    "name": "disp",
    "displayName": "Displacements",
    "type": "multiSelect",
    "default": "",
    "options": [
      {
        "name": "X",
        "value": "x"
      },
      {
        "name": "Y",
        "value": "y"
      },
      {
        "name": "Mag",
        "value": "mag"
      }
    ]
  },
  {
    "name": "stress",
    "displayName": "Stress",
    "type": "multiSelect",
    "required": "true",
    "default": "",
    "options": [
      {
        "name": "eps_x",
        "value": "eps_x"
      },
      {
        "name": "eps_y",
        "value": "eps_y"
      },
      {
        "name": "eps_z",
        "value": "eps_z"
      },
      {
        "name": "gamma_xy",
        "value": "gamma_xy"
      },
      {
        "name": "sig_x",
        "value": "sig_x"
      },
      {
        "name": "sig_y",
        "value": "sig_y"
      },
      {
        "name": "sig_z",
        "value": "sig_z"
      },
      {
        "name": "tau_xy",
        "value": "tau_xy"
      },
      {
        "name": "sig_1",
        "value": "sig_1"
      },
      {
        "name": "sig_2",
        "value": "sig_2"
      },
      {
        "name": "tau_max",
        "value": "tau_max"
      },
      {
        "name": "eps_1",
        "value": "eps_1"
      },
      {
        "name": "eps_2",
        "value": "eps_2"
      },
      {
        "name": "gamma_max",
        "value": "gamma_max"
      },
      {
        "name": "huber",
        "value": "huber"
      },
      {
        "name": "sign_huber",
        "value": "sign_huber"
      },
      {
        "name": "eff_strain",
        "value": "eff_strain"
      },
      {
        "name": "theta",
        "value": "theta"
      },
      {
        "name": "inv_1",
        "value": "inv_1"
      },
      {
        "name": "inv_2",
        "value": "inv_2"
      },
      {
        "name": "epl_x",
        "value": "epl_x"
      },
      {
        "name": "epl_y",
        "value": "epl_y"
      },
      {
        "name": "epl_z",
        "value": "epl_z"
      },
      {
        "name": "epl_xy",
        "value": "epl_xy"
      }
    ]
  },
  {
    "name": "deformed",
    "displayName": "Deformed",
    "type": "number",    
    "default": "1"
  },
  {
    "displayName": "Plasticity",
    "name": "plast",
    "type": "select",
    "default": "pl_strain",
    "options": [
      {
        "name": "pl_strain",
        "value": "pl_strain"
      },
      {
        "name": "res_huber",
        "value": "res_huber"
      },
      {
        "name": "h_stress",
        "value": "h_stress"
      },
      {
        "name": "res",
        "value": "res"
      }
    ]
  },
  {
    "displayName": "Probe",
    "name": "probe",
    "type": "color",
    "default": "green"
  }
]