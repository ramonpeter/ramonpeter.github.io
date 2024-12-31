---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing


sections:
  - block: resume-biography-2
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: bg.jpeg
          filters:
            brightness: 0.4
          size: cover
          position: center
          parallax: false
  # - block: stats
  #   content:
  #     items:
  #       - statistic: "20"
  #         description: |
  #           Publications
  #       - statistic: "933"
  #         description: |
  #           Citations
  #       - statistic: "16"
  #         description: |
  #           h-index
  #   design:
  #     # Section background color (CSS class)
  #     css_class: "bg-gray-100 dark:bg-gray-900"
  #     # Reduce spacing
  #     spacing:
  #       padding: [0, 0, 0, 0]
  - block: markdown
    content:
      title: 'About me'
      subtitle: ''
      text: |-
        I am a postdoctoral researcher at Tif Lab at the University of Milan. I work at the intersection of particle physics and machine learning. My research aims to fully establish data-driven techniques in high-energy physics and to enhance standard simulation methods with (generative) neural networks. My interests extend to simulation-based inference, which is crucially dependent on first-principle simulations provided by theory, as well as precision calculations.
  
    design:
      columns: '1'
---
