# Fastify Video Processing API

This Node.js application built with Fastify and FFmpeg allows users to upload a video, trim it to a specified duration, and resize it to given dimensions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Video Uploading](#video-uploading)
  - [Video Resizing](#video-resizing)
  - [Video Trimming](#video-trimming)


## Introduction

This Fastify-based Node.js application uses FFmpeg to process video files. It provides API endpoints for uploading, trimming, and resizing videos.

## Features

1. Upload a video file.
2. Trim a video based on start and end times.
3. Resize a video to specified dimensions.

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://gitlab.com/ishakail/ffmpeg_ishakzail
   ```

2. Install the dependencies

    ```bash
    cd ffmpeg_ishakzail
    npm install
    ```

3. Run the Project
    ```bash
    npm run start
    ```
## Usage

***Note ⚠***
  * Concerning the uploaded file in the `resize-video` and `trim-video` APIs, they are initially stored in a temporary file. After processing, these temporary files are deleted, and the trimmed/resized videos are then stored in the **uploads**. folder.
  * For the uploaded file in the upload-video API, it is directly stored in the **uploads** folder.

### Video Uploading

**Endpoint:** `/api/upload-video`

- **Method:** POST
- **Request Body:**
  ```json
  {
    "video": File,
  }
  ```
**Example (POSTMAN)**

![upload-video](https://gitlab.com/ishakail/ffmpeg_ishakzail/-/raw/main/images/upload-video.png)


### Video Resizing

**Endpoint:** `/api/resize-video`

- **Method:** POST
- **Request Body:**
  ```json
  {
    "video": File,
    "height": {
      "value": "480",
      "type": "string"
    },
    "width": {
      "value": "640",
      "type": "string"
    }
  }
  ```
**Example (POSTMAN)**

![resize-video](https://gitlab.com/ishakail/ffmpeg_ishakzail/-/raw/main/images/resize-video.png)


### Video Trimming

**Endpoint:** `/api/trim-video`

- **Method:** POST
- **Request Body:**
  ```json
  {
    "video": File,
    "startTime": {
      "value": "0",
      "type": "string"
    },
    "endTime": {
      "value": "60",
      "type": "string"
    }
  }
  ```
**Example (POSTMAN)**

![trim-video](https://gitlab.com/ishakail/ffmpeg_ishakzail/-/raw/main/images/trim-video.png)


