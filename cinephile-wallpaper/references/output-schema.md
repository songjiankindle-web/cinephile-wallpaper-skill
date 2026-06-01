# Output Schema

## Manifest

Write one manifest per generated wallpaper:

```json
{
  "film": {
    "title": "",
    "original_title": "",
    "original_title_language": "",
    "year": "",
    "director": "",
    "country": [],
    "source_urls": []
  },
  "visual_brief": {},
  "film_tone": {
    "color_system": "",
    "brightness": "",
    "contrast": "",
    "temperature": "",
    "medium_clues": [],
    "tonal_strategy": "",
    "rationale": "",
    "avoid_tone": []
  },
  "art_language": {
    "style_selection_mode": "user_specified | weighted_random | corrective",
    "style_lane": "",
    "style_variant": "",
    "primary": "",
    "secondary": "",
    "movement_family": "modern_contemporary | classical | regional_traditional | material_process | counterpoint",
    "abstraction_mechanism": "",
    "semiotic_layers": [],
    "counterpoint_bridge": "",
    "style_weights": {},
    "classic_style_boost_applied": true,
    "rationale": "",
    "random_style_kept": true,
    "fresh_generation": true
  },
  "visual_density": {
    "mode": "dense | balanced | sparse | single_stroke",
    "selection_mode": "user_specified | weighted_random | corrective",
    "minimalism_boost_applied": true,
    "density_weights": {
      "dense": 0,
      "balanced": 0,
      "sparse": 0,
      "single_stroke": 0
    },
    "density_inputs": {
      "genres": [],
      "scale": "intimate | medium | epic",
      "tempo": "slow | moderate | fast",
      "narrative_complexity": "minimal | moderate | complex",
      "authorial_mode": "mainstream | genre | art_cinema | experimental",
      "visual_world": "realist | stylized | spectacle | austere | unknown"
    },
    "focal_point": "",
    "negative_space_role": "",
    "max_primary_elements": 3,
    "detail_budget": "low | medium | high",
    "quiet_area_ratio": "10-25% | 25-45% | 45-70% | 70%+",
    "rationale": "",
    "clutter_control": {
      "clear_first_read": false,
      "removed_extra_motifs": [],
      "hierarchy_notes": ""
    }
  },
  "typography": {
    "title_zh": "",
    "original_title": "",
    "original_title_language": "",
    "director_zh": "",
    "country_zh": [],
    "role": "major_visual_component | minimal_metadata | none",
    "lettering_style": "",
    "style_lane_alignment": "",
    "placement": "",
    "integration_method": "",
    "avoid_generic_font": true
  },
  "character_reference": {
    "enabled": false,
    "presence": "user_requested | user_declined | inferred | none",
    "user_upload_prompt_shown": false,
    "characters": [],
    "identity_locks": [],
    "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only | none",
    "user_uploaded_reference_paths": [],
    "uploaded_attachment_ids": [],
    "source_stills": [],
    "character_crops": [],
    "costume_posture_refs": [],
    "local_reference_paths": [],
    "reference_images_attached": false,
    "acquisition_method": "browser_search | web_search | trailer_frame | user_upload | text_only | none",
    "image_reference_capable": false,
    "identity_preservation_mode": "attached_character_crops | user_uploaded_refs | unavailable_non_face_only | text_only_identity_risk",
    "visual_traits": [],
    "required_traits": {
      "face": [],
      "hair": [],
      "costume": [],
      "posture": [],
      "props": [],
      "expression": []
    },
    "forbidden_substitutions": [],
    "strategy": "",
    "source_urls": [],
    "auto_acquisition_attempted": false,
    "user_uploaded_refs_authoritative": false,
    "text_only_identity_risk": false,
    "face_restoration_claimed": false,
    "recognition_check": {
      "recognizable_before_title": false,
      "reference_gate_passed": false,
      "character_crops_attached": false,
      "failure_recovery_used": false,
      "notes": ""
    }
  },
  "prop_reference": {
    "enabled": false,
    "props": [],
    "identity_locks": [],
    "reference_mode": "auto_acquired_refs | user_uploaded_refs | image_references | text_only | none",
    "reference_images": [],
    "local_reference_paths": [],
    "source_urls": [],
    "required_traits": {
      "category_function": "",
      "shape": [],
      "material": [],
      "scale": [],
      "usage_pose": [],
      "film_context": []
    },
    "forbidden_substitutions": [],
    "text_only_prop_risk": false
  },
  "model": {
    "provider": "",
    "name": "",
    "parameters": {},
    "generation_mode": "prompt_only | agent_image_tool | external_api | image_skill | auto"
  },
  "wallpaper_settings": {
    "width": 2560,
    "height": 1440,
    "size_source": "user | device_lookup | detected_current_screen | default",
    "output_dir": "",
    "set_desktop": false,
    "language": "",
    "language_source": "detected | user",
    "text_variants": ["with_text", "no_text"],
    "text_rendering_mode": "model_text | no_text | both",
    "one_turn_setup": true,
    "defaults_used": [],
    "global_text_overlay_used": false
  },
  "preference_memory": {
    "size_remembered": false,
    "output_dir_remembered": false,
    "text_variant_remembered": false,
    "generation_mode_remembered": false,
    "all_base_settings_remembered": false,
    "used_all_defaults": false,
    "preferences_path": ""
  },
  "outputs": {
    "visual_image": "",
    "wallpaper": "",
    "wallpaper_with_text": "",
    "wallpaper_no_text": ""
  },
  "prompt": {
    "unified_prompt": "",
    "model_notes": "",
    "portable_prompt": true,
    "style_escalation_used": false
  },
  "created_at": "",
  "desktop_set": false
}
```

## No Output Cache

Do not maintain a generated-poster cache for reuse. A repeated film request should create a fresh image unless the user explicitly asks to retrieve a previous file.

## File Naming

Use filesystem-safe names:

```text
YYYY-MM-DD_HHMM_Title_wallpaper.png
YYYY-MM-DD_HHMM_Title_visual.png
YYYY-MM-DD_HHMM_Title_manifest.json
```
