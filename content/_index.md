---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: Ramon Winterhalder
      text: ""
      # Show a call-to-action button under your biography? (optional)
      # button:
      #   text: Download CV
      #   url: uploads/resume.pdf
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
  - block: markdown
    content:
      title: '📚 My Research'
      subtitle: ''
      text: |-
        I am a postdoctoral researcher at the intersection of particle physics and machine learning. My research aims to fully establish data-driven techniques in high-energy physics and to enhance standard simulation methods with (generative) neural networks. In particular, I am interested in:
        - Generative models
        - Explainable and interpretable AI
        - Simulation-based inference
        - Monte Carlo generators
        - Higher-order calculations
        - PDF fits

        Please reach out if you are interested to collaborate!
    design:
      columns: '1'
  - block: markdown
    content:
      title: '✉️ Contact'
      subtitle: ''
      text: |-
        Physics Department  
        Università degli Studi di Milano  
        Via Celoria 16  
        20133 Milan  
        Italy  

        [ramon.winterhalder@unimi.it](mailto:ramon.winterhalder@unimi.it)
    design:
      columns: '1'
      css_class: dark
      background:
        color: DimGray
  # - block: collection
  #   id: papers
  #   content:
  #     title: Featured Publications
  #     filters:
  #       folders:
  #         - publication
  #       featured_only: true
  #   design:
  #     view: article-grid
  #     columns: 2
  # - block: collection
  #   content:
  #     title: Recent Publications
  #     text: ""
  #     filters:
  #       folders:
  #         - publication
  #       exclude_featured: false
  #   design:
  #     view: citation
  # - block: collection
  #   id: talks
  #   content:
  #     title: Recent & Upcoming Talks
  #     filters:
  #       folders:
  #         - event
  #   design:
  #     view: article-grid
  #     columns: 1
---
