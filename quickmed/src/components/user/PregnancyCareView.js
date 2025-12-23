import React, { useState, useEffect, useRef } from 'react';
import './PregnancyCareView.css';

// SVG Icons Component
const Icon = ({ name, size = 20, color = '#7C2A62', style = {} }) => {
  const icons = {
    heart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
    ),
    file: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5z"/>
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    bell: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    ),
    download: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
    ),
    share: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
      </svg>
    ),
    stethoscope: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 8c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1h-2V3c0-.55-.45-1-1-1s-1 .45-1 1v1h-2V3c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V5h2v2c0 .55.45 1 1 1s1-.45 1-1V5h2v2c0 .55.45 1 1 1z"/>
        <path d="M16 11c0 2.76-2.24 5-5 5s-5-2.24-5-5c0-.55-.45-1-1-1s-1 .45-1 1c0 3.87 3.13 7 7 7s7-3.13 7-7c0-.55-.45-1-1-1s-1 .45-1 1z"/>
      </svg>
    ),
    baby: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 10c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-.91.21-1.77.58-2.53C7.08 10.79 8.54 11.5 10 11.5s2.92-.71 4.42-2.03c.37.76.58 1.62.58 2.53z"/>
      </svg>
    ),
    scale: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/>
      </svg>
    ),
    thermometer: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1v1h-2V5z"/>
      </svg>
    ),
    activity: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-6h2v6zm4 0h-2v-7h2v7z"/>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    pill: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M18.32 5.68c-1.53-1.53-4.01-1.53-5.54 0L5.68 12.78c-1.53 1.53-1.53 4.01 0 5.54 1.53 1.53 4.01 1.53 5.54 0l7.1-7.1c1.53-1.53 1.53-4.01 0-5.54zM8.9 8.9l6.2 6.2-1.1 1.1-6.2-6.2 1.1-1.1z"/>
      </svg>
    ),
    food: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"/>
      </svg>
    ),
    ai: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M21 11.5c0 .36-.04.71-.1 1.05.36.23.7.51 1 .82.15.15.28.32.39.5.23.35.4.74.51 1.16.11.42.15.86.15 1.32 0 1.15-.29 2.19-.78 3.05-.49.86-1.17 1.54-1.97 2.03-.80.49-1.74.73-2.72.73-.57 0-1.11-.09-1.62-.27-.51-.18-.97-.44-1.37-.78-.4-.34-.73-.75-1-1.22-.27-.47-.47-.99-.6-1.56-.13-.57-.2-1.17-.2-1.79 0-1.15.29-2.19.78-3.05.49-.86 1.17-1.54 1.97-2.03.8-.49 1.74-.73 2.72-.73.1 0 .19.01.29.01.31-.47.67-.88 1.07-1.24.4-.36.84-.66 1.32-.91.48-.25.99-.44 1.54-.57.55-.13 1.12-.2 1.71-.2 1.15 0 2.19.29 3.05.78.86.49 1.54 1.17 2.03 1.97.49.8.73 1.74.73 2.72 0 .57-.09 1.11-.27 1.62-.18.51-.44.97-.78 1.37-.34.4-.75.73-1.22 1-.47.27-.99.47-1.56.6-.57.13-1.17.2-1.79.2-.1 0-.19-.01-.29-.01-.31.47-.67.88-1.07 1.24-.4.36-.84.66-1.32.91-.48.25-.99.44-1.54.57-.55.13-1.12.2-1.71.2-1.15 0-2.19-.29-3.05-.78-.86-.49-1.54-1.17-2.03-1.97-.49-.8-.73-1.74-.73-2.72 0-.57.09-1.11.27-1.62.18-.51.44-.97.78-1.37.34-.4.75-.73 1.22-1 .47-.27.99-.47 1.56-.6.57-.13 1.17-.2 1.79-.2h.29c.06-.34.1-.69.1-1.05 0-1.15-.29-2.19-.78-3.05-.49-.86-1.17-1.54-1.97-2.03-.8-.49-1.74-.73-2.72-.73-.57 0-1.11.09-1.62.27-.51.18-.97.44-1.37.78-.4.34-.73.75-1 1.22-.27.47-.47.99-.6 1.56-.13.57-.2 1.17-.2 1.79 0 1.15.29 2.19.78 3.05.49.86 1.17 1.54 1.97 2.03.8.49 1.74.73 2.72.73.1 0 .19-.01.29-.01.31.47.67.88 1.07 1.24.4.36.84.66 1.32.91.48.25.99.44 1.54.57.55.13 1.12.2 1.71.2 1.15 0 2.19-.29 3.05-.78.86-.49 1.54-1.17 2.03-1.97.49-.8.73-1.74.73-2.72 0-.57-.09-1.11-.27-1.62-.18-.51-.44-.97-.78-1.37-.34-.4-.75-.73-1.22-1-.47-.27-.99-.47-1.56-.6-.57-.13-1.17-.2-1.79-.2h-.29c-.06-.34-.1-.69-.1-1.05z"/>
      </svg>
    ),
    progress: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.62 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
      </svg>
    ),
    info: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    ),
    rupee: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M13.66 7C13.1 5.82 11.9 5 10.5 5L6 5V3h12v2l-3.26 0c0 .48.17.92.46 1.29L18 9v2h-4.09c-.07-.33-.16-.66-.25-1H18v2h-4.34c-1.03 1.23-2.6 2-4.66 2v2c1.82 0 3.47-.76 4.66-2H18v2h-4.66C12.1 18.18 10.9 19 9.5 19L6 19v2l12 0v-2l-3.26 0c0-.48-.17-.92-.46-1.29L6 15v-2h4.09c.07.33.16.66.25 1H6v-2h4.34c1.03-1.23 2.6-2 4.66-2v-2c-1.82 0-3.47.76-4.66 2H6V9h4.66z"/>
      </svg>
    ),
    package: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15zM5 15.91l6 3.38v-6.71L5 9.21v6.7zm14 0v-6.7l-6 3.37v6.71l6-3.38z"/>
      </svg>
    ),
    doctor: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    hospital: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 6v5h-2V6h-2v5h-2V6h-2v5h-2V6H9v5H7V6H5v14h14V6h-2z"/>
      </svg>
    ),
    test: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    ultrasound: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 14c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
        <path d="M16 6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H8V8h8v8z"/>
      </svg>
    ),
    nutrition: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
      </svg>
    ),
    homevisit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    arrowLeft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    ),
    arrowRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    ),
    arrow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    ),
    refresh: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
      </svg>
    ),
    user: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    appointments: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    family: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"/>
      </svg>
    ),
    classes: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    ),
    mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    copy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
    ),
    default: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
  };
  
  return icons[name] || icons.default;
};

const INITIAL_PREGNANCY_DATA = {
  currentWeek: 24,
  dueDate: '2024-06-15',
  familyMembers: 4,
  pregnancyPackage: 'Premium Pregnancy Care',
};

// Pregnancy Care Packages (replacing subscription plans)
const PREGNANCY_CARE_PACKAGES = [
  {
    id: 'basic-pregnancy-care',
    title: 'Basic Pregnancy Care',
    price: 25000,
    duration: '9 months',
    patientsEnrolled: '8 patients enrolled',
    features: [
      'Monthly checkups',
      'Basic tests (Blood, Urine)',
      '2 Ultrasounds',
      'Hospital delivery',
      'Postnatal checkup'
    ],
    popular: false,
    description: 'Essential pregnancy care for a healthy journey'
  },
  {
    id: 'premium-pregnancy-care',
    title: 'Premium Pregnancy Care',
    price: 50000,
    duration: '9 months',
    patientsEnrolled: '5 patients enrolled',
    features: [
      'Fortnightly checkups',
      'All tests included',
      '4 Ultrasounds',
      'Home visits (3 times)',
      'Nutrition counseling',
      'Delivery & postnatal care'
    ],
    popular: true,
    description: 'Comprehensive care with home visits and nutrition support'
  },
  {
    id: 'comprehensive-pregnancy-care',
    title: 'Comprehensive Pregnancy Care',
    price: 75000,
    duration: '9 months',
    patientsEnrolled: '2 patients enrolled',
    features: [
      'Weekly checkups',
      'All tests & advanced scans',
      'Unlimited home visits',
      'Personalized nutrition plan',
      'Delivery preparation classes',
      'Complete postnatal care'
    ],
    popular: false,
    description: 'Premium complete care package with unlimited support'
  }
];

// 9-Month Pregnancy Diet Plans
const PREGNANCY_DIET_PLANS = {
  1: {
    month: 1,
    focus: 'Early Nutrition & Nausea Management',
    dailyCalories: 2200,
    keyNutrients: ['Folic Acid', 'Vitamin B6', 'Iron', 'Vitamin B12'],
    foods: {
      recommended: ['Leafy greens', 'Citrus fruits', 'Whole grains', 'Lean proteins'],
      avoid: ['Raw seafood', 'Unpasteurized dairy', 'High-mercury fish']
    },
    sampleDay: {
      breakfast: 'Whole grain toast with avocado + Ginger tea',
      snack: 'Banana with almonds',
      lunch: 'Quinoa salad with chickpeas and veggies',
      snack: 'Greek yogurt with berries',
      dinner: 'Grilled chicken with steamed vegetables',
      bedtime: 'Warm milk with honey'
    },
    tips: [
      'Eat small, frequent meals (6-8 times/day)',
      'Stay hydrated with 8-10 glasses of water',
      'Ginger tea helps with morning sickness',
      'Avoid strong smells and spicy foods'
    ]
  },
  2: {
    month: 2,
    focus: 'Organ Development Support',
    dailyCalories: 2300,
    keyNutrients: ['Protein', 'Calcium', 'Omega-3', 'Vitamin D'],
    foods: {
      recommended: ['Eggs', 'Salmon', 'Spinach', 'Berries', 'Nuts'],
      avoid: ['Processed meats', 'Artificial sweeteners', 'Excess caffeine']
    },
    sampleDay: {
      breakfast: 'Oatmeal with chia seeds, berries, and walnuts',
      snack: 'Hard-boiled eggs (2)',
      lunch: 'Lentil soup with whole grain bread',
      snack: 'Cottage cheese with pineapple chunks',
      dinner: 'Baked salmon with sweet potato and broccoli',
      bedtime: 'Chamomile tea'
    },
    tips: [
      'Include protein in every meal',
      'Focus on calcium-rich foods',
      'Limit caffeine to 200mg per day',
      'Get moderate exercise'
    ]
  },
  3: {
    month: 3,
    focus: 'Brain Development & Growth',
    dailyCalories: 2400,
    keyNutrients: ['Omega-3 DHA', 'Choline', 'Iodine', 'Zinc'],
    foods: {
      recommended: ['Walnuts', 'Eggs', 'Lean beef', 'Dairy products'],
      avoid: ['Raw sprouts', 'Undercooked eggs', 'High-sodium foods']
    },
    sampleDay: {
      breakfast: 'Scrambled eggs with spinach',
      snack: 'Walnuts and dried apricots',
      lunch: 'Lean beef stir-fry with vegetables',
      snack: 'Greek yogurt with honey',
      dinner: 'Baked chicken with quinoa',
      bedtime: 'Herbal tea'
    },
    tips: [
      'Include omega-3 rich foods daily',
      'Eat iodine-rich foods for thyroid health',
      'Cook eggs thoroughly',
      'Stay active with light exercises'
    ]
  },
  4: {
    month: 4,
    focus: 'Bone Development & Energy',
    dailyCalories: 2500,
    keyNutrients: ['Calcium', 'Vitamin D', 'Magnesium', 'Protein'],
    foods: {
      recommended: ['Dairy', 'Leafy greens', 'Fish', 'Nuts and seeds'],
      avoid: ['Alcohol', 'Excess caffeine', 'Processed foods']
    },
    sampleDay: {
      breakfast: 'Greek yogurt with granola and berries',
      snack: 'Cheese cubes with whole grain crackers',
      lunch: 'Spinach salad with salmon',
      snack: 'Almonds and raisins',
      dinner: 'Grilled fish with roasted vegetables',
      bedtime: 'Warm milk'
    },
    tips: [
      'Get sunlight for Vitamin D',
      'Include dairy products daily',
      'Eat magnesium-rich foods',
      'Stay hydrated'
    ]
  },
  5: {
    month: 5,
    focus: 'Muscle Development & Blood Volume',
    dailyCalories: 2600,
    keyNutrients: ['Iron', 'Vitamin C', 'Protein', 'Vitamin B12'],
    foods: {
      recommended: ['Lean meats', 'Citrus fruits', 'Legumes', 'Whole grains'],
      avoid: ['Raw shellfish', 'Soft cheeses', 'Deli meats']
    },
    sampleDay: {
      breakfast: 'Fortified cereal with milk and orange juice',
      snack: 'Orange slices',
      lunch: 'Lentil curry with brown rice',
      snack: 'Hard-boiled egg',
      dinner: 'Lean steak with steamed broccoli',
      bedtime: 'Chamomile tea'
    },
    tips: [
      'Pair iron-rich foods with Vitamin C',
      'Eat lean protein at every meal',
      'Cook meats thoroughly',
      'Monitor weight gain'
    ]
  },
  6: {
    month: 6,
    focus: 'Brain Growth & Fat Storage',
    dailyCalories: 2700,
    keyNutrients: ['Healthy fats', 'Omega-3', 'Vitamin E', 'Selenium'],
    foods: {
      recommended: ['Avocado', 'Nuts', 'Olive oil', 'Fatty fish'],
      avoid: ['Trans fats', 'Fried foods', 'Sugary drinks']
    },
    sampleDay: {
      breakfast: 'Avocado toast with eggs',
      snack: 'Mixed nuts',
      lunch: 'Tuna salad sandwich',
      snack: 'Apple with almond butter',
      dinner: 'Salmon with asparagus',
      bedtime: 'Herbal infusion'
    },
    tips: [
      'Include healthy fats in meals',
      'Eat omega-3 rich fish twice a week',
      'Choose whole foods over processed',
      'Stay active with walking'
    ]
  },
  7: {
    month: 7,
    focus: 'Lung Development & Immune Support',
    dailyCalories: 2800,
    keyNutrients: ['Vitamin C', 'Beta-carotene', 'Selenium', 'Zinc'],
    foods: {
      recommended: ['Bell peppers', 'Carrots', 'Berries', 'Garlic'],
      avoid: ['Raw honey', 'Unpasteurized juices', 'High-mercury fish']
    },
    sampleDay: {
      breakfast: 'Berry smoothie with spinach',
      snack: 'Carrot sticks with hummus',
      lunch: 'Chicken vegetable soup',
      snack: 'Strawberries with yogurt',
      dinner: 'Turkey meatballs with tomato sauce',
      bedtime: 'Ginger tea'
    },
    tips: [
      'Eat colorful vegetables daily',
      'Include immune-boosting foods',
      'Cook vegetables lightly',
      'Stay hydrated with water'
    ]
  },
  8: {
    month: 8,
    focus: 'Final Growth & Energy Storage',
    dailyCalories: 2900,
    keyNutrients: ['Complex carbs', 'Fiber', 'Iron', 'Calcium'],
    foods: {
      recommended: ['Whole grains', 'Legumes', 'Dairy', 'Leafy greens'],
      avoid: ['Large meals', 'Spicy foods', 'Gas-producing foods']
    },
    sampleDay: {
      breakfast: 'Oatmeal with dates and nuts',
      snack: 'Prunes and yogurt',
      lunch: 'Bean burrito with whole wheat tortilla',
      snack: 'Cottage cheese with fruit',
      dinner: 'Chicken and vegetable stir-fry with brown rice',
      bedtime: 'Warm milk with turmeric'
    },
    tips: [
      'Eat small, frequent meals',
      'Include fiber to prevent constipation',
      'Focus on complex carbohydrates',
      'Rest when needed'
    ]
  },
  9: {
    month: 9,
    focus: 'Labor Preparation & Recovery',
    dailyCalories: 3000,
    keyNutrients: ['Vitamin K', 'Iron', 'Protein', 'Complex carbs'],
    foods: {
      recommended: ['Leafy greens', 'Lean meats', 'Whole grains', 'Dates'],
      avoid: ['Heavy meals', 'New foods', 'Excess sugar']
    },
    sampleDay: {
      breakfast: 'Date and nut energy balls',
      snack: 'Banana with peanut butter',
      lunch: 'Lean beef stew with vegetables',
      snack: 'Greek yogurt with honey',
      dinner: 'Baked fish with quinoa and spinach',
      bedtime: 'Raspberry leaf tea'
    },
    tips: [
      'Eat dates daily for labor preparation',
      'Focus on iron-rich foods',
      'Stay hydrated',
      'Prepare easy-to-digest meals'
    ]
  }
};

const PregnancyCareView = ({ 
  user, 
  addNotification, 
  setActiveView,
  // Props from UserDashboard
  userSubscriptions = [],
  isSubscribed = false,
  handleSubscribe, // This is the Razorpay function from UserDashboard
  handleUpgradeSubscription,
  paymentLoading = false,
  showSubscriptionModal = false,
  setShowSubscriptionModal,
  selectedSubscription,
  setSelectedSubscription,
  showUpgradeModal = false,
  setShowUpgradeModal,
  selectedUpgradePlan,
  setSelectedUpgradePlan
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pregnancyData, setPregnancyData] = useState(INITIAL_PREGNANCY_DATA);
  const [medicalReports, setMedicalReports] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Fixed vitals state with all possible vital types
  const [vitals, setVitals] = useState({
    bloodPressure: { value: '120/80', date: '2024-01-20', trend: 'stable' },
    weight: { value: '65 kg', date: '2024-01-20', trend: '+0.5kg/week' },
    bloodSugar: { value: '95 mg/dL', date: '2024-01-20', trend: 'normal' },
    temperature: { value: '36.8°C', date: '2024-01-20', trend: 'normal' },
    heartRate: { value: '', date: '', trend: '' },
    fetalHeartRate: { value: '', date: '', trend: '' }
  });
  
  const [showAddVitalModal, setShowAddVitalModal] = useState(false);
  const [newVital, setNewVital] = useState({ type: '', value: '', date: '', notes: '' });
  const fileInputRef = useRef(null);
  const [aiDietPlan, setAiDietPlan] = useState([]);
  const [medicineReminders, setMedicineReminders] = useState([]);
  
  const [showUploadedFileModal, setShowUploadedFileModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showShareVitalsModal, setShowShareVitalsModal] = useState(false);
  const [selectedVitalsToShare, setSelectedVitalsToShare] = useState([]);
  
  // New state variables
  const [currentMonth, setCurrentMonth] = useState(1);
  const [pregnancyProgress, setPregnancyProgress] = useState(0);
  const [showPaymentCancelledModal, setShowPaymentCancelledModal] = useState(false);
  const [paymentCancelledMessage, setPaymentCancelledMessage] = useState('');
  const [showPackageDetailsModal, setShowPackageDetailsModal] = useState(false);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareOptions, setShareOptions] = useState(null);
  const [selectedShareOption, setSelectedShareOption] = useState('');
  const [regeneratingPlan, setRegeneratingPlan] = useState(false);
  const [showRegenerationModal, setShowRegenerationModal] = useState(false);
  const [regenerationProgress, setRegenerationProgress] = useState(0);

  // Share with Doctor modal state
  const [showShareDoctorModal, setShowShareDoctorModal] = useState(false);
  const [shareDoctorData, setShareDoctorData] = useState(null);

  const realTimeDietData = [
    { time: 'Breakfast (8:00 AM)', meals: ['Oatmeal with berries and almonds (300 cal)'], recommendation: 'High in protein and fiber', nutrients: 'Protein: 25g, Fiber: 8g' },
    { time: 'Mid-Morning Snack (11:00 AM)', meals: ['Apple with peanut butter (150 cal)'], recommendation: 'Maintains blood sugar', nutrients: 'Healthy fats, Vitamins' },
    { time: 'Lunch (1:00 PM)', meals: ['Grilled chicken with quinoa (450 cal)'], recommendation: 'Balanced meal', nutrients: 'Protein: 35g, Iron: 15% DV' },
    { time: 'Afternoon Snack (4:00 PM)', meals: ['Cottage cheese with fruits (160 cal)'], recommendation: 'Prevents energy slump', nutrients: 'Calcium: 20% DV' },
    { time: 'Dinner (7:00 PM)', meals: ['Baked fish with vegetables (420 cal)'], recommendation: 'Light, digestible meal', nutrients: 'Protein: 30g, Fiber: 10g' },
    { time: 'Bedtime (9:00 PM)', meals: ['Warm milk with turmeric (120 cal)'], recommendation: 'Promotes sleep', nutrients: 'Calcium: 30% DV' }
  ];

  // Get active pregnancy package from UserDashboard
  const activePregnancyPackage = userSubscriptions?.find(sub => 
    sub.planType === 'pregnancyCare' && sub.status === 'active'
  );

  // Helper functions for input validation
  const getPlaceholder = (type) => {
    switch(type) {
      case 'Weight': return 'e.g., 65.5 kg';
      case 'Blood Pressure': return 'e.g., 120/80';
      case 'Blood Sugar': return 'e.g., 95 mg/dL';
      case 'Temperature': return 'e.g., 36.8°C';
      case 'Heart Rate': return 'e.g., 72 bpm';
      case 'Fetal Heart Rate': return 'e.g., 140 bpm';
      default: return 'Enter value';
    }
  };

  const validateVitalInput = (type, value) => {
    if (!value || value.trim() === '') {
      return { valid: false, message: 'Value is required' };
    }
    
    const trimmedValue = value.trim();
    
    switch(type) {
      case 'Blood Pressure':
        if (!/^\d{2,3}\/\d{2,3}$/.test(trimmedValue)) {
          return { 
            valid: false, 
            message: 'Please use format: systolic/diastolic (e.g., 120/80)' 
          };
        }
        const [systolic, diastolic] = trimmedValue.split('/').map(Number);
        if (systolic < 50 || systolic > 250 || diastolic < 30 || diastolic > 150) {
          return { 
            valid: false, 
            message: 'Please enter realistic blood pressure values' 
          };
        }
        break;
      
      case 'Weight':
        const weightMatch = trimmedValue.match(/^(\d+(\.\d{0,2})?)\s*(kg|lbs)?$/i);
        if (!weightMatch) {
          return { 
            valid: false, 
            message: 'Please enter weight (e.g., 65.5 kg or 150 lbs)' 
          };
        }
        const weightNum = parseFloat(weightMatch[1]);
        if (weightNum < 20 || weightNum > 300) {
          return { 
            valid: false, 
            message: 'Please enter a realistic weight (20-300)' 
          };
        }
        break;
      
      case 'Blood Sugar':
        const sugarMatch = trimmedValue.match(/^(\d+(\.\d{0,1})?)\s*(mg\/dL|mmol\/L)?$/i);
        if (!sugarMatch) {
          return { 
            valid: false, 
            message: 'Please enter blood sugar (e.g., 95 mg/dL)' 
          };
        }
        const sugarNum = parseFloat(sugarMatch[1]);
        if (sugarNum < 40 || sugarNum > 400) {
          return { 
            valid: false, 
            message: 'Please enter a realistic blood sugar value (40-400)' 
          };
        }
        break;
      
      case 'Temperature':
        const tempMatch = trimmedValue.match(/^(\d+(\.\d{0,1})?)\s*°?[CF]?$/i);
        if (!tempMatch) {
          return { 
            valid: false, 
            message: 'Please enter temperature (e.g., 36.8°C)' 
          };
        }
        const tempNum = parseFloat(tempMatch[1]);
        if (tempNum < 34 || tempNum > 42) {
          return { 
            valid: false, 
            message: 'Please enter a realistic temperature (34-42°C)' 
          };
        }
        break;
      
      case 'Heart Rate':
      case 'Fetal Heart Rate':
        const hrMatch = trimmedValue.match(/^(\d+)\s*(bpm)?$/i);
        if (!hrMatch) {
          return { 
            valid: false, 
            message: 'Please enter heart rate (e.g., 72 bpm)' 
          };
        }
        const hrNum = parseInt(hrMatch[1]);
        const isFetal = type === 'Fetal Heart Rate';
        const minHR = isFetal ? 100 : 40;
        const maxHR = isFetal ? 180 : 200;
        if (hrNum < minHR || hrNum > maxHR) {
          return { 
            valid: false, 
            message: `Please enter a realistic ${type.toLowerCase()} (${minHR}-${maxHR} bpm)` 
          };
        }
        break;
    }
    
    return { valid: true, message: '' };
  };

  const getMaxLength = (type) => {
    switch(type) {
      case 'Weight': return 10;
      case 'Blood Pressure': return 7; // 120/80
      case 'Blood Sugar': return 12; // 95 mg/dL
      case 'Temperature': return 6; // 36.8°C
      case 'Heart Rate':
      case 'Fetal Heart Rate': return 5; // 120 bpm
      default: return 50;
    }
  };

  const getInputHint = (type) => {
    switch(type) {
      case 'Weight': return 'Enter weight in kg or lbs (20-300)';
      case 'Blood Pressure': return 'Format: systolic/diastolic (e.g., 120/80)';
      case 'Blood Sugar': return 'Enter value in mg/dL (40-400)';
      case 'Temperature': return 'Enter temperature in °C (34-42)';
      case 'Heart Rate': return 'Enter heart rate in bpm (40-200)';
      case 'Fetal Heart Rate': return 'Enter fetal heart rate in bpm (100-180)';
      default: return '';
    }
  };

  // Check if user has premium access
  const hasPremiumAccess = () => {
    return isSubscribed && activePregnancyPackage;
  };

  // Calculate pregnancy progress percentage
  const calculatePregnancyProgress = () => {
    const progress = (pregnancyData.currentWeek / 40) * 100;
    setPregnancyProgress(progress);
    return progress;
  };

  // Update pregnancy progress
  const updatePregnancyProgress = (newWeek) => {
    const progress = (newWeek / 40) * 100;
    setPregnancyProgress(progress);
    setPregnancyData(prev => ({ ...prev, currentWeek: newWeek }));
    return progress;
  };

  // Get trimester based on week
  const getTrimester = (week) => {
    if (week <= 12) return 'First Trimester';
    if (week <= 27) return 'Second Trimester';
    return 'Third Trimester';
  };

  // Show payment cancelled modal
  const showPaymentCancelled = (message = 'Your payment was cancelled. You can try again.') => {
    setPaymentCancelledMessage(message);
    setShowPaymentCancelledModal(true);
    
    // Optionally add a notification
    addNotification('Payment Cancelled', message, 'alert');
  };

  // Show package details modal
  const showPackageDetails = (packageItem) => {
    setSelectedPackageDetails(packageItem);
    setShowPackageDetailsModal(true);
  };

  // Handle subscription navigation
  const handleSubscribeToAccess = () => {
    // Navigate to subscription plans tab
    setActiveTab('plans');
    
    // Scroll to packages section
    setTimeout(() => {
      const packagesSection = document.querySelector('.subscription-plans-section');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    addNotification('Subscription Plans', 'Please select a pregnancy care package to access premium features', 'info');
  };

  // Handle share with doctor link
  const handleShareWithDoctorLink = (packageData = null) => {
    const shareData = {
      title: packageData ? `Pregnancy Care Package - ${packageData.title}` : 'Pregnancy Health Records',
      text: packageData 
        ? `I'm interested in the ${packageData.title} package for my pregnancy care. Please review and share your recommendations.`
        : 'Please review my pregnancy health records and vitals for your expert opinion.',
      type: packageData ? 'package' : 'records',
      data: packageData || {
        vitals: Object.entries(vitals).filter(([key, val]) => val.value && val.value.trim() !== ''),
        reports: medicalReports.length,
        currentWeek: pregnancyData.currentWeek
      },
      timestamp: new Date().toLocaleString(),
      // Generate a unique share link
      shareLink: `${window.location.origin}/doctor-share/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      accessCode: Math.random().toString(36).substr(2, 8).toUpperCase()
    };

    setShareDoctorData(shareData);
    setShowShareDoctorModal(true);
  };

  // Regenerate AI diet plan
  const handleRegenerateAIPlan = () => {
    // Check if user has premium access
    if (!hasPremiumAccess()) {
      addNotification(
        'Premium Feature Required',
        'AI Diet Plan Regeneration requires a pregnancy care package subscription',
        'alert'
      );
      
      // Redirect to packages tab
      setActiveTab('plans');
      
      // Scroll to packages section
      setTimeout(() => {
        const packagesSection = document.querySelector('.subscription-plans-section');
        if (packagesSection) {
          packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
      return;
    }

    setRegeneratingPlan(true);
    setRegenerationProgress(0);
    setShowRegenerationModal(true);
    
    // Simulate AI processing with progress updates
    const progressInterval = setInterval(() => {
      setRegenerationProgress(prev => {
        const newProgress = prev + 25;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 500);

    // Get current month's focus - SAFE ACCESS
    const monthPlan = PREGNANCY_DIET_PLANS[currentMonth] || PREGNANCY_DIET_PLANS[1];
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Generate new AI-optimized meal plan
      const mealVariations = {
        1: ['Oatmeal with berries and almonds', 'Greek yogurt with honey and nuts', 'Whole grain toast with avocado'],
        2: ['Apple with peanut butter', 'Handful of walnuts and almonds', 'Orange slices with cottage cheese'],
        3: ['Grilled chicken with quinoa', 'Lentil soup with vegetables', 'Tofu stir-fry with brown rice'],
        4: ['Cottage cheese with fruits', 'Yogurt with granola', 'Protein smoothie'],
        5: ['Baked fish with vegetables', 'Grilled salmon with sweet potato', 'Chicken vegetable stew'],
        6: ['Warm milk with turmeric', 'Chamomile tea', 'Herbal infusion']
      };

      const updatedPlan = realTimeDietData.map((meal, index) => {
        const mealKey = index + 1;
        const variations = mealVariations[mealKey] || meal.meals;
        const randomMeal = variations[Math.floor(Math.random() * variations.length)];
        
        // Generate AI recommendations
        const recommendation = generateAIRecommendation(currentMonth, index);
        const nutrients = generateNutrientInfo(currentMonth, index);
        
        return {
          ...meal,
          meals: [`${randomMeal} [AI Optimized]`],
          recommendation: recommendation,
          nutrients: nutrients,
          aiGenerated: true,
          timestamp: new Date().toLocaleTimeString(),
          month: currentMonth,
          focus: monthPlan?.focus || 'Nutrition & Health',
          calories: (monthPlan?.dailyCalories || 2200) + Math.floor(Math.random() * 100) - 50 // Random variation
        };
      });

      setAiDietPlan(updatedPlan);
      setRegeneratingPlan(false);
      clearInterval(progressInterval);
      
      // Close modal after a delay
      setTimeout(() => {
        setShowRegenerationModal(false);
        setRegenerationProgress(0);
      }, 1000);
      
      addNotification(
        'AI Plan Regenerated',
        `Your Month ${currentMonth} diet plan has been updated with AI optimizations`,
        'health'
      );
    }, 2000);
  };

  // Generate AI recommendation based on month and meal time
  const generateAIRecommendation = (month, mealIndex) => {
    const recommendations = {
      morning: [
        'High protein breakfast supports morning energy',
        'Fiber-rich meal helps digestion throughout the day',
        'Complex carbs provide sustained energy'
      ],
      midday: [
        'Balanced nutrients support baby development',
        'Iron-rich food enhances blood production',
        'Calcium intake supports bone development'
      ],
      evening: [
        'Light dinner aids digestion and sleep',
        'Protein supports overnight tissue repair',
        'Low glycemic index prevents blood sugar spikes'
      ]
    };

    let timeOfDay = 'midday';
    if (mealIndex === 0) timeOfDay = 'morning';
    else if (mealIndex >= realTimeDietData.length - 2) timeOfDay = 'evening';

    const specificRecs = {
      1: 'Extra folic acid for early development',
      2: 'Protein for organ formation',
      3: 'Omega-3 for brain development',
      4: 'Calcium for bone growth',
      5: 'Iron for increased blood volume',
      6: 'Healthy fats for baby\'s brain growth',
      7: 'Vitamin C for immune support',
      8: 'Complex carbs for energy storage',
      9: 'Vitamin K for labor preparation'
    };

    const baseRec = recommendations[timeOfDay]?.[mealIndex % (recommendations[timeOfDay]?.length || 3)] || 'Balanced nutrition for pregnancy';
    const specificRec = specificRecs[month] || 'Tailored for your pregnancy stage.';
    
    return `${baseRec}. ${specificRec}`;
  };

  // Generate nutrient information
  const generateNutrientInfo = (month, mealIndex) => {
    const nutrientProfiles = {
      1: { protein: '20-25g', fiber: '8-10g', calcium: '15% DV', folate: '100% DV' },
      2: { protein: '25-30g', fiber: '10-12g', calcium: '20% DV', iron: '15% DV' },
      3: { protein: '30-35g', fiber: '12-15g', omega3: '500mg', iodine: '100% DV' },
      4: { protein: '35-40g', fiber: '15-18g', calcium: '30% DV', vitaminD: '50% DV' },
      5: { protein: '40-45g', fiber: '18-20g', iron: '20% DV', vitaminC: '100% DV' },
      6: { protein: '35-40g', fiber: '15-18g', healthyFats: '20g', vitaminE: '30% DV' },
      7: { protein: '30-35g', fiber: '12-15g', vitaminC: '120% DV', betaCarotene: '80% DV' },
      8: { protein: '25-30g', fiber: '10-12g', complexCarbs: '50g', iron: '25% DV' },
      9: { protein: '20-25g', fiber: '8-10g', vitaminK: '100% DV', carbs: '45g' }
    };

    const profile = nutrientProfiles[month] || nutrientProfiles[1] || {};
    const nutrients = Object.entries(profile).map(([key, value]) => 
      `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
    ).join(', ');

    return nutrients + ' (AI Optimized)';
  };

  // Handle share functionality
  const handleSharePlan = () => {
    const shareData = {
      title: `Pregnancy Diet Plan - Month ${currentMonth}`,
      text: `Check out my AI-optimized pregnancy diet plan for Month ${currentMonth}: ${PREGNANCY_DIET_PLANS[currentMonth]?.focus || 'Pregnancy Nutrition'}`,
      month: currentMonth,
      focus: PREGNANCY_DIET_PLANS[currentMonth]?.focus || 'Nutrition & Health',
      plan: aiDietPlan.slice(0, 3), // Share first 3 meals as preview
      timestamp: new Date().toLocaleString(),
      url: window.location.href
    };

    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url
      })
      .then(() => {
        addNotification('Plan Shared', 'Diet plan shared successfully', 'share');
      })
      .catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to show share options
        setShareOptions({
          title: 'Share Diet Plan',
          message: `Share your Month ${currentMonth} pregnancy diet plan`,
          options: ['Copy Link', 'Send Email', 'Download PDF', 'Share with Doctor'],
          data: shareData
        });
        setShowShareModal(true);
      });
    } else {
      // Fallback: Show share options modal
      setShareOptions({
        title: 'Share Diet Plan',
        message: `Share your Month ${currentMonth} pregnancy diet plan`,
        options: ['Copy Link', 'Send Email', 'Download PDF', 'Share with Doctor'],
        data: shareData
      });
      setShowShareModal(true);
    }
  };

  // Initialize user data
  useEffect(() => {
    setMedicalReports([
      { id: 1, name: 'First Trimester Ultrasound', date: '2023-12-01', type: 'ultrasound',
        uploadedBy: 'Dr. Sarah Johnson', encrypted: true, access: ['patient', 'doctor'] },
      { id: 2, name: 'Blood Test Results', date: '2024-01-15', type: 'lab',
        uploadedBy: 'Lab Technician', encrypted: true, access: ['patient', 'doctor'] }
    ]);

    setAiDietPlan(realTimeDietData);
    setMedicineReminders([
      { id: 1, medicine: 'Prenatal Vitamins', time: '09:00 AM', dosage: '1 tablet', status: 'taken' },
      { id: 2, medicine: 'Folic Acid', time: '09:00 AM', dosage: '400mcg', status: 'taken' },
      { id: 3, medicine: 'Iron Supplement', time: '02:00 PM', dosage: '1 tablet', status: 'pending' }
    ]);
    
    // Calculate current month
    const calculatedMonth = Math.ceil(pregnancyData.currentWeek / 4.33);
    setCurrentMonth(Math.min(calculatedMonth, 9));
    
    // Calculate initial pregnancy progress
    const progress = calculatePregnancyProgress();
    setPregnancyProgress(progress);
    
    // Generate initial diet plan
    generateMonthlyDietPlan();
  }, []);

  // Generate monthly diet plan
  const generateMonthlyDietPlan = () => {
    // Use safe access with defaults
    const monthPlan = PREGNANCY_DIET_PLANS[currentMonth] || PREGNANCY_DIET_PLANS[1];
    
    // Ensure all properties exist with defaults
    const focus = monthPlan?.focus || 'Nutrition & Health';
    const dailyCalories = monthPlan?.dailyCalories || 2200;
    
    const updatedPlan = realTimeDietData.map(meal => ({
      ...meal,
      meals: meal.meals.map(m => `${m} [Month ${currentMonth} Optimized]`),
      month: currentMonth,
      focus: focus,
      calories: dailyCalories
    }));
    
    setAiDietPlan(updatedPlan);
    
    if (hasPremiumAccess()) {
      addNotification(
        'Diet Plan Updated',
        `Your ${focus} diet plan for Month ${currentMonth} is ready!`,
        'health'
      );
    }
  };

  // Navigation between months
  const navigateMonth = (direction) => {
    const newMonth = currentMonth + direction;
    if (newMonth >= 1 && newMonth <= 9) {
      setCurrentMonth(newMonth);
      generateMonthlyDietPlan();
    }
  };

  // Mark medicine as taken
  const markMedicineTaken = (reminderId) => {
    setMedicineReminders(prev => prev.map(reminder => 
      reminder.id === reminderId ? { ...reminder, status: 'taken', takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : reminder
    ));
    addNotification('Medicine Taken', 'Medicine marked as taken', 'health');
  };

  // Add medicine reminder
  const addMedicineReminder = () => {
    const newReminder = {
      id: Date.now(),
      medicine: 'New Medicine',
      time: '12:00 PM',
      dosage: '1 tablet',
      status: 'pending'
    };
    setMedicineReminders(prev => [newReminder, ...prev]);
    addNotification('Reminder Added', 'New medicine reminder added', 'health');
  };

  // File upload functions
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload only images (JPG, PNG) or PDF files');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    setUploadingFile(true);

    try {
      const validationResult = await validatePrescription(file);
      
      if (validationResult.valid) {
        const newReport = {
          id: Date.now(),
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          type: getFileType(file.type),
          fileUrl: URL.createObjectURL(file),
          uploadedBy: user?.fullName || 'Patient',
          encrypted: true,
          size: formatFileSize(file.size),
          access: ['patient', 'doctor'],
          validatedByAI: true,
          file: file
        };

        setMedicalReports(prev => [newReport, ...prev]);
        setUploadedFile(newReport);
        setShowUploadedFileModal(true);
        addNotification('File Uploaded', `${file.name} has been uploaded and validated by AI`, 'medical');
      } else {
        alert(`AI Validation Failed: ${validationResult.message}`);
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const validatePrescription = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ valid: Math.random() > 0.1, message: 'Prescription validated successfully' });
      }, 2000);
    });
  };

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    return 'document';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadReport = (report) => {
    if (report.file) {
      const url = URL.createObjectURL(report.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    alert(`Downloading ${report.name}...\n\nSecurity Note: This file is encrypted and requires authentication.`);
  };

  const deleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setMedicalReports(prev => prev.filter(r => r.id !== reportId));
      addNotification('Report Deleted', 'Medical report has been deleted', 'medical');
    }
  };

  // Vital functions
  const addVitalRecord = () => {
    // Validate required fields
    if (!newVital.type || !newVital.value || !newVital.date) {
      alert('Please fill all required fields');
      return;
    }
    
    // Validate value format
    const validation = validateVitalInput(newVital.type, newVital.value);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
    
    // Additional validation for date
    const today = new Date().toISOString().split('T')[0];
    const selectedDate = new Date(newVital.date);
    const currentDate = new Date();
    
    // Reset time part for comparison
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    // Allow dates up to today (not future)
    if (selectedDate > currentDate) {
      alert('Cannot record vitals for future dates');
      return;
    }

    // Create consistent key names that match initial state
    const getVitalKey = (type) => {
      const keyMap = {
        'Blood Pressure': 'bloodPressure',
        'Weight': 'weight',
        'Blood Sugar': 'bloodSugar',
        'Temperature': 'temperature',
        'Heart Rate': 'heartRate',
        'Fetal Heart Rate': 'fetalHeartRate'
      };
      return keyMap[type] || type.toLowerCase().replace(/\s+/g, '');
    };

    const key = getVitalKey(newVital.type);
    
    // Check if this vital type already exists
    if (vitals[key] && vitals[key].value && !window.confirm(`A ${newVital.type} record already exists. Do you want to update it?`)) {
      return;
    }

    setVitals(prev => ({
      ...prev,
      [key]: {
        value: newVital.value.trim(),
        date: newVital.date,
        trend: calculateTrend(newVital.type, newVital.value, prev[key]?.value),
        notes: newVital.notes || '',
        // Add timestamp to differentiate entries
        timestamp: new Date().toISOString()
      }
    }));

    // Reset form and close modal
    setNewVital({ type: '', value: '', date: '', notes: '' });
    setShowAddVitalModal(false);
    addNotification('Vital Recorded', `${newVital.type} recorded successfully`, 'health');
  };

  // Calculate trend function
  const calculateTrend = (type, newValue, oldValue) => {
    if (!oldValue || oldValue === '') return 'new';
    
    try {
      if (type === 'Blood Pressure') {
        const [newSys, newDia] = newValue.split('/').map(Number);
        const [oldSys, oldDia] = oldValue.split('/').map(Number);
        if (isNaN(newSys) || isNaN(newDia) || isNaN(oldSys) || isNaN(oldDia)) return 'stable';
        if (newSys > oldSys + 10 || newDia > oldDia + 10) return 'increasing';
        if (newSys < oldSys - 10 || newDia < oldDia - 10) return 'decreasing';
        return 'stable';
      }
      
      if (type === 'Weight') {
        const newWeight = parseFloat(newValue);
        const oldWeight = parseFloat(oldValue);
        if (isNaN(newWeight) || isNaN(oldWeight)) return 'stable';
        if (newWeight > oldWeight + 1) return 'increasing';
        if (newWeight < oldWeight - 1) return 'decreasing';
        return 'stable';
      }
      
      // For other numeric vitals
      if (type === 'Heart Rate' || type === 'Fetal Heart Rate' || type === 'Blood Sugar' || type === 'Temperature') {
        const newNum = parseFloat(newValue);
        const oldNum = parseFloat(oldValue);
        if (isNaN(newNum) || isNaN(oldNum)) return 'stable';
        const diff = newNum - oldNum;
        if (Math.abs(diff) < 0.1) return 'stable';
        return diff > 0 ? 'increasing' : 'decreasing';
      }
      
      return 'stable';
    } catch (error) {
      console.error('Error calculating trend:', error);
      return 'stable';
    }
  };

  const openShareVitalsModal = () => {
    setSelectedVitalsToShare(Object.keys(vitals).filter(key => vitals[key].value && vitals[key].value.trim() !== ''));
    setShowShareVitalsModal(true);
  };

  const shareVitalsWithDoctor = () => {
    const vitalsData = Object.entries(vitals)
      .filter(([key]) => selectedVitalsToShare.includes(key))
      .map(([key, data]) => `${key}: ${data.value} (${data.trend}) - ${data.date}`);
    
    alert(`Sharing selected vitals with your doctor...\n\n${vitalsData.join('\n')}`);
    addNotification('Vitals Shared', 'Health vitals shared with your doctor', 'share');
    setShowShareVitalsModal(false);
  };

  // Add useEffect to handle month changes safely
  useEffect(() => {
    // Ensure current month is valid (1-9)
    if (currentMonth < 1) setCurrentMonth(1);
    if (currentMonth > 9) setCurrentMonth(9);
    
    // Generate diet plan when month changes
    generateMonthlyDietPlan();
  }, [currentMonth]);

  // Back Button Component
  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      className="back-button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      type="button"
    >
      <span style={{ marginRight: '8px' }}>←</span> {text}
    </button>
  );

  // Close Button Component (Stable - doesn't move)
  const CloseButton = ({ onClick, size = 30 }) => (
    <button 
      className="close-btn-stable"
      onClick={onClick}
      type="button"
      aria-label="Close"
    >
      <Icon name="close" size={size} color="#666" />
    </button>
  );

  // Pregnancy Care Packages Section - UPDATED to use handleSubscribe from UserDashboard
  const PregnancyPackagesSection = () => (
    <div className="subscription-plans-section">
      <div className="section-header">
        <h3><Icon name="package" size={24} /> Pregnancy Care Packages</h3>
        <p>Choose the perfect care package for your pregnancy journey</p>
      </div>
      
      <div className="packages-container">
        {PREGNANCY_CARE_PACKAGES.map(pkg => {
          const isActive = activePregnancyPackage?.planId === pkg.id;
          const canUpgrade = activePregnancyPackage && 
            activePregnancyPackage.price < pkg.price;
          
          return (
            <div
              key={pkg.id}
              className={`package-card ${pkg.popular ? 'popular' : ''} ${isActive ? 'active' : ''}`}
            >
              {pkg.popular && <div className="popular-badge">MOST POPULAR</div>}
              
              <div className="package-header">
                <h4>{pkg.title}</h4>
                <div className="package-price">
                  <span className="price">
                    <Icon name="rupee" size={28} />
                    {pkg.price.toLocaleString()}
                  </span>
                  <span className="duration">{pkg.duration}</span>
                </div>
                <div className="patients-enrolled">
                  <Icon name="users" size={16} /> {pkg.patientsEnrolled}
                </div>
              </div>
              
              <div className="package-features">
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <Icon name="check" size={16} color="#4CAF50" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="package-actions">
                <button 
                  className="details-button"
                  onClick={() => showPackageDetails(pkg)}
                >
                  <Icon name="info" size={16} /> Package Details
                </button>
                
                <button 
                  className="share-button"
                  onClick={() => handleShareWithDoctorLink(pkg)}
                >
                  <Icon name="share" size={16} /> Share with Doctor
                </button>
                
                {isActive ? (
                  <div className="active-subscription">
                    <Icon name="check" size={20} color="#4CAF50" />
                    <span>Active Package</span>
                  </div>
                ) : canUpgrade ? (
                  <button
                    className="upgrade-button"
                    onClick={() => handleUpgradeSubscription({
                      subscription: activePregnancyPackage,
                      annualPlan: pkg
                    })}
                    disabled={paymentLoading}
                  >
                    <Icon name="arrow" size={16} /> {paymentLoading ? 'Processing...' : 'Upgrade Package'}
                  </button>
                ) : (
                  <button
                    className="subscribe-button"
                    onClick={() => handleSubscribe(pkg)} // Use handleSubscribe from UserDashboard (Razorpay)
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? 'Processing...' : 'Subscribe Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="pregnancy-container">
      {/* Header */}
      <div className="pregnancy-header-row">
        <BackButton onClick={() => setActiveView('dashboard')} text="Dashboard" />
        
        <div className="pregnancy-title-section">
          <h1 className="pregnancy-main-title">Pregnancy Care <span style={{ fontSize: '32px' }}>🤰</span></h1>
          <p className="pregnancy-subtitle">Track your pregnancy journey with comprehensive care and monitoring</p>
        </div>

        <button 
          className="pregnancy-appointment-button"
          onClick={() => setActiveView('appointments')}
        >
          <Icon name="appointments" size={20} /> My Appointments
        </button>
      </div>

      {/* Package Status Bar */}
      <div className="subscription-status-bar">
        {activePregnancyPackage ? (
          <div className={`subscription-status active`}>
            <div>
              <strong>{activePregnancyPackage.title}</strong>
              <p>
                Active until {new Date(activePregnancyPackage.endDate).toLocaleDateString()} • 
                {activePregnancyPackage.duration || '9 months'} Package
              </p>
            </div>
            <div className="subscription-actions">
              {PREGNANCY_CARE_PACKAGES.filter(pkg => pkg.price > activePregnancyPackage.price).map(pkg => (
                <button 
                  key={pkg.id}
                  className="upgrade-btn" 
                  onClick={() => handleUpgradeSubscription({
                    subscription: activePregnancyPackage,
                    annualPlan: pkg
                  })}
                  disabled={paymentLoading}
                >
                  <Icon name="arrow" size={16} /> {paymentLoading ? 'Processing...' : `Upgrade to ${pkg.title}`}
                </button>
              ))}
              <button className="manage-btn" onClick={() => setActiveView('profile')}>
                <Icon name="user" size={16} /> Manage in Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="subscription-status inactive">
            <p>No active pregnancy package. <a href="#plans" onClick={(e) => { e.preventDefault(); setActiveTab('plans'); }}>Subscribe now</a> for premium features.</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="dashboard-section">
        <div className="tabs-container">
          <div className="tabs">
            {['overview', 'records', 'care', 'plans'].map(tab => (
              <button key={tab} className={`tab ${activeTab === tab ? 'active-tab' : ''}`} onClick={() => setActiveTab(tab)}>
                <Icon name={
                  tab === 'overview' ? 'heart' : 
                  tab === 'records' ? 'shield' : 
                  tab === 'care' ? 'progress' :
                  'package'
                } size={20} />
                {tab === 'overview' ? 'Overview' : 
                 tab === 'records' ? 'Secure Records' : 
                 tab === 'care' ? 'Care Plan' :
                 'Care Packages'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content" style={{ overflow: 'hidden' }}>
            {activeTab === 'overview' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                <div className="card card-spacing">
                  <div className="card-header">
                    <h3>Pregnancy Progress</h3>
                    <span>{Math.round(pregnancyProgress)}% Complete</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${pregnancyProgress}%` }}
                    />
                  </div>
                  <div className="flex-between mt-20">
                    <span>Week {pregnancyData.currentWeek} of 40</span>
                    <span>Due Date: {pregnancyData.dueDate}</span>
                  </div>
                  <div className="mt-15">
                    <small>
                      <Icon name="info" size={14} /> 
                      {getTrimester(pregnancyData.currentWeek)} • 
                      {40 - pregnancyData.currentWeek} weeks remaining
                    </small>
                  </div>
                </div>

                <div className="section-spacing">
                  <h3>Pregnancy Care Features</h3>
                  <div className="grid">
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="doctor" size={24} /><h4>Doctor Consultations</h4></div>
                      <p>Regular checkups with experienced gynecologists</p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="test" size={24} /><h4>Medical Tests</h4></div>
                      <p>Complete blood, urine, and ultrasound tests</p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="homevisit" size={24} /><h4>Home Visits</h4></div>
                      <p>Convenient home checkups for your comfort</p>
                    </div>
                    <div className="feature-card">
                      <div className="feature-header"><Icon name="nutrition" size={24} /><h4>Nutrition Counseling</h4></div>
                      <p>Personalized diet plans for each trimester</p>
                    </div>
                  </div>
                </div>

                <div className="section-spacing">
                  <div className="flex-between mb-30">
                    <h3>Health Vitals Monitoring</h3>
                    <div className="gap-10 flex-wrap">
                      <button className="secondary-button" onClick={() => setShowAddVitalModal(true)}>
                        <Icon name="edit" size={16} /> Add Vital
                      </button>
                      <button className="button" onClick={() => handleShareWithDoctorLink()}>
                        <Icon name="share" size={16} /> Share with Doctor
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid">
                    {Object.entries(vitals)
                      .filter(([key, data]) => data.value && data.value.trim() !== '') // Only show vitals with values
                      .map(([key, data]) => (
                        <div key={key} className="vital-card">
                          <Icon name={
                            key === 'bloodPressure' ? 'activity' : 
                            key === 'weight' ? 'scale' : 
                            key === 'temperature' ? 'thermometer' :
                            key === 'heartRate' ? 'heart' :
                            key === 'fetalHeartRate' ? 'baby' :
                            'activity'
                          } size={28} />
                          <div className="vital-info">
                            <h4>{key === 'bloodPressure' ? 'Blood Pressure' : 
                                 key === 'bloodSugar' ? 'Blood Sugar' : 
                                 key === 'heartRate' ? 'Heart Rate' : 
                                 key === 'fetalHeartRate' ? 'Fetal Heart Rate' :
                                 key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                            <p>{data.value}</p>
                            <div className="vital-details">
                              <span>Trend: {data.trend || 'new'}</span>
                              <span>Last: {data.date}</span>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'records' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                <div className="secure-folder">
                  <div className="folder-header">
                    <div className="header-left">
                      <Icon name="shield" size={28} />
                      <h3>Secure Medical Records (File Locker)</h3>
                      <span className="encryption-badge">End-to-End Encrypted</span>
                    </div>
                    <button className="upload-btn" onClick={() => fileInputRef.current?.click()} disabled={uploadingFile}>
                      <Icon name="upload" size={20} /> {uploadingFile ? 'Uploading...' : 'Upload Prescription/Report'}
                    </button>
                  </div>

                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept=".jpg,.jpeg,.png,.pdf" />

                  <div className="folder-info">
                    <p><strong>AI Validation:</strong> All prescriptions are validated by AI before processing</p>
                    <div className="security-features">
                      <span><Icon name="lock" size={16} /> 256-bit Encryption</span>
                      <span><Icon name="shield" size={16} /> HIPAA Compliant</span>
                      <span><Icon name="eye" size={16} /> Access Control</span>
                    </div>
                  </div>

                  <div className="files-grid">
                    {medicalReports.map(report => (
                      <div key={report.id} className="file-card">
                        <div className="file-header">
                          <div className="file-icon"><Icon name={report.type === 'ultrasound' ? 'ultrasound' : 'file'} size={24} /></div>
                          <div className="file-actions">
                            <button className="icon-btn" onClick={() => downloadReport(report)} title="Download"><Icon name="download" size={18} /></button>
                            <button className="icon-btn" onClick={() => handleShareWithDoctorLink()} title="Share with Doctor"><Icon name="share" size={18} /></button>
                            <button className="icon-btn" onClick={() => deleteReport(report.id)} title="Delete"><Icon name="trash" size={18} /></button>
                          </div>
                        </div>
                        <div className="file-info">
                          <h4>{report.name}</h4>
                          <p>Uploaded: {report.date}</p>
                          <div className="file-security">
                            {report.encrypted && <span><Icon name="lock" size={14} /> Encrypted</span>}
                            {report.validatedByAI && <span><Icon name="ai" size={14} /> AI Validated</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                {/* Diet Plan Section */}
                <div className="card card-spacing">
                  <div className="diet-header">
                    <div>
                      <h3>Real-Time AI Diet Plan</h3>
                      <p className="month-display">Month {currentMonth} Focus</p>
                    </div>
                    <div className="diet-controls">
                      <div className="month-navigation-stable">
                        <button 
                          className="month-nav-btn" 
                          onClick={() => navigateMonth(-1)} 
                          disabled={currentMonth <= 1}
                        >
                          <Icon name="arrowLeft" size={16} /> Prev
                        </button>
                        <div className="current-month-display">
                          <div className="month-text">CURRENT MONTH</div>
                          <div className="month-number">Month {currentMonth}</div>
                          <div className="month-focus">
                            {PREGNANCY_DIET_PLANS[currentMonth]?.focus?.split('&')[0]?.trim() || 'Nutrition & Health'}
                          </div>
                        </div>
                        <button 
                          className="month-nav-btn" 
                          onClick={() => navigateMonth(1)} 
                          disabled={currentMonth >= 9}
                        >
                          Next <Icon name="arrowRight" size={16} />
                        </button>
                      </div>
                      
                      <div className="diet-action-buttons">
                        <button 
                          className="secondary-button" 
                          onClick={handleRegenerateAIPlan}
                          disabled={regeneratingPlan}
                        >
                          {regeneratingPlan ? (
                            <>
                              <span className="spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #f3f3f3', borderTop: '2px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                              Regenerating...
                            </>
                          ) : (
                            <>
                              <Icon name="refresh" size={16} /> Regenerate AI Plan
                            </>
                          )}
                        </button>
                        <button 
                          className="button" 
                          onClick={handleSharePlan}
                        >
                          <Icon name="share" size={16} /> Share
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Month-specific stats */}
                  <div className="month-stats-grid">
                    <div className="month-stat">
                      <div className="stat-label">Daily Calories</div>
                      <div className="stat-value">
                        {PREGNANCY_DIET_PLANS[currentMonth]?.dailyCalories || 2200}
                      </div>
                    </div>
                    <div className="month-stat">
                      <div className="stat-label">Key Nutrients</div>
                      <div className="stat-value-nutrients">
                        {PREGNANCY_DIET_PLANS[currentMonth]?.keyNutrients?.slice(0, 3).join(', ') || 'Folic Acid, Iron'}
                      </div>
                    </div>
                    <div className="month-stat">
                      <div className="stat-label">Recommended Foods</div>
                      <div className="stat-value-foods">
                        {PREGNANCY_DIET_PLANS[currentMonth]?.foods?.recommended?.slice(0, 3).join(', ') || 'Leafy greens, Citrus fruits'}
                      </div>
                    </div>
                  </div>

                  {/* Diet plan */}
                  <div className="diet-plan">
                    {aiDietPlan.map((meal, index) => (
                      <div key={index} className="meal-card">
                        <div className="meal-time">
                          <Icon name="clock" size={18} />
                          <span>{meal.time}</span>
                          {meal.aiGenerated && (
                            <span className="ai-badge">
                              <Icon name="ai" size={12} /> AI Optimized
                            </span>
                          )}
                        </div>
                        <div className="meal-details">
                          <div className="meal-options">
                            {meal.meals.map((option, idx) => (
                              <div key={idx} className="meal-option">
                                <Icon name="food" size={16} />
                                <span>{option}</span>
                                <span className="month-tag">Month {currentMonth}</span>
                              </div>
                            ))}
                          </div>
                          <div className="meal-info">
                            <div><strong>Recommendation:</strong> {meal.recommendation}</div>
                            <div><strong>Key Nutrients:</strong> {meal.nutrients}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Premium tips for current month */}
                  {hasPremiumAccess() && PREGNANCY_DIET_PLANS[currentMonth]?.tips && (
                    <div className="card mt-30">
                      <h4><Icon name="ai" size={20} /> Premium Tips for Month {currentMonth}</h4>
                      <ul style={{ paddingLeft: '20px' }}>
                        {(PREGNANCY_DIET_PLANS[currentMonth].tips || []).map((tip, idx) => (
                          <li key={idx} style={{ marginBottom: '8px' }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Medicine Guidance - Only for premium users */}
                {hasPremiumAccess() ? (
                  <div className="card card-spacing">
                    <h3><Icon name="pill" size={24} /> Monthly Medication Guidance</h3>
                    <p>Personalized medication plan for Month {currentMonth}</p>
                    <div className="medication-guide">
                      <div className="medication-item">
                        <Icon name="pill" size={24} />
                        <div>
                          <h4>Prenatal Vitamins</h4>
                          <p>Take 1 tablet daily with breakfast</p>
                        </div>
                      </div>
                      <div className="medication-item">
                        <Icon name="pill" size={24} />
                        <div>
                          <h4>Folic Acid (400mcg)</h4>
                          <p>Essential for fetal brain development</p>
                        </div>
                      </div>
                      <div className="medication-item">
                        <Icon name="pill" size={24} />
                        <div>
                          <h4>Iron Supplement</h4>
                          <p>Take with Vitamin C for better absorption</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card card-spacing premium-locked">
                    <div className="premium-locked-content">
                      <Icon name="lock" size={48} color="#7C2A62" />
                      <h3>Monthly Medication Guidance</h3>
                      <p>Get personalized medication guidance based on your pregnancy stage</p>
                      <button className="button" onClick={handleSubscribeToAccess}>
                        <Icon name="shield" size={20} /> Unlock with Package
                      </button>
                    </div>
                  </div>
                )}

                {/* Medicine Reminders */}
                <div className="card card-spacing">
                  <div className="flex-between flex-wrap mb-25">
                    <div><h3>Medicine Reminders</h3><p>Daily medication schedule</p></div>
                    <div className="gap-10">
                      <button className="secondary-button" onClick={addMedicineReminder}><Icon name="pill" size={16} /> Add Reminder</button>
                      <button className="button" onClick={() => setMedicineReminders(prev => prev.map(r => ({...r, status: 'pending'})))}>Reset All</button>
                    </div>
                  </div>

                  <div className="reminders-grid">
                    {medicineReminders.map(reminder => (
                      <div key={reminder.id} className="reminder-card">
                        <div className="reminder-info">
                          <Icon name="pill" size={24} />
                          <div>
                            <h4>{reminder.medicine}</h4>
                            <p>{reminder.time} • {reminder.dosage}</p>
                            <span className={`status-tag ${reminder.status}`}>{reminder.status === 'taken' ? `Taken at ${reminder.takenAt || 'N/A'}` : 'Pending'}</span>
                          </div>
                        </div>
                        {reminder.status === 'pending' && <button className="button" onClick={() => markMedicineTaken(reminder.id)}>Mark Taken</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div style={{ overflow: 'hidden', height: '100%' }}>
                <PregnancyPackagesSection />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}

      {/* Add Vital Modal */}
      {showAddVitalModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header-stable">
              <h3>Add Vital Record</h3>
              <CloseButton onClick={() => {
                setShowAddVitalModal(false);
                setNewVital({ type: '', value: '', date: '', notes: '' });
              }} />
            </div>
            
            <div className="modal-body">
              <div className="input-group">
                <label>Vital Type *</label>
                <select 
                  className="input" 
                  value={newVital.type} 
                  onChange={(e) => setNewVital({...newVital, type: e.target.value})}
                >
                  <option value="">Select type</option>
                  <option value="Blood Pressure">Blood Pressure</option>
                  <option value="Weight">Weight</option>
                  <option value="Blood Sugar">Blood Sugar</option>
                  <option value="Temperature">Temperature</option>
                  <option value="Heart Rate">Heart Rate</option>
                  <option value="Fetal Heart Rate">Fetal Heart Rate</option>
                </select>
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="input-group">
                  <label>Value *</label>
                  <input 
                    className="input" 
                    type="text" 
                    placeholder={getPlaceholder(newVital.type)}
                    value={newVital.value}
                    onChange={(e) => {
                      setNewVital({...newVital, value: e.target.value});
                    }}
                    maxLength={getMaxLength(newVital.type)}
                    style={{ width: '100%' }}
                  />
                  <small className="hint-text">
                    {getInputHint(newVital.type)}
                  </small>
                </div>
                
                <div className="input-group">
                  <label>Date *</label>
                  <input 
                    className="input" 
                    type="date" 
                    value={newVital.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      const today = new Date().toISOString().split('T')[0];
                      
                      // Allow dates up to today (not future dates)
                      if (selectedDate > today) {
                        alert('Please select a date that is not in the future');
                        return;
                      }
                      
                      setNewVital({...newVital, date: selectedDate});
                    }}
                    max={new Date().toISOString().split('T')[0]} // Disable future dates
                  />
                  <small className="hint-text">
                    You can record vitals for today or previous days
                  </small>
                </div>
              </div>
              
              <div className="input-group">
                <label>Notes (Optional)</label>
                <textarea 
                  className="textarea" 
                  placeholder="Any symptoms or observations..."
                  value={newVital.notes}
                  onChange={(e) => setNewVital({...newVital, notes: e.target.value})}
                  rows="3"
                />
              </div>
              
              {/* Update Pregnancy Week (Only for Weight) */}
              {newVital.type === 'Weight' && (
                <div className="card mt-15" style={{ background: '#f0f7ff' }}>
                  <div className="flex-between">
                    <div>
                      <h4>Update Pregnancy Week</h4>
                      <p>Update your current pregnancy week if needed</p>
                    </div>
                    <input 
                      type="number"
                      min="1"
                      max="40"
                      value={pregnancyData.currentWeek}
                      onChange={(e) => {
                        const newWeek = parseInt(e.target.value);
                        if (newWeek >= 1 && newWeek <= 40) {
                          updatePregnancyProgress(newWeek);
                        }
                      }}
                      className="input"
                      style={{ width: '80px', textAlign: 'center' }}
                    />
                  </div>
                  <div className="mt-10">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${pregnancyProgress}%` }}
                      />
                    </div>
                    <div className="flex-between mt-5">
                      <small>Week {pregnancyData.currentWeek} of 40</small>
                      <small>{Math.round(pregnancyProgress)}% Complete</small>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  if (!newVital.type || !newVital.value || !newVital.date) {
                    alert('Please fill all required fields');
                    return;
                  }
                  addVitalRecord();
                }}
              >
                <Icon name="check" size={18} /> Save Record
              </button>
              <button 
                className="secondary-button" 
                onClick={() => {
                  setShowAddVitalModal(false);
                  setNewVital({ type: '', value: '', date: '', notes: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded File Modal */}
      {showUploadedFileModal && uploadedFile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-stable">
              <h3>File Uploaded Successfully!</h3>
              <CloseButton onClick={() => setShowUploadedFileModal(false)} />
            </div>
            <div className="modal-body">
              <div className="file-details">
                <div className="file-icon-large"><Icon name="file" size={48} /></div>
                <div className="file-info-large">
                  <h4>{uploadedFile.name}</h4>
                  <div className="file-meta">
                    <span><Icon name="calendar" size={14} /> Uploaded: {uploadedFile.date}</span>
                    <span><Icon name="scale" size={14} /> Size: {uploadedFile.size}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer gap-10">
              <button className="button" onClick={() => downloadReport(uploadedFile)}><Icon name="download" size={18} /> Download File</button>
              <button className="secondary-button" onClick={() => setShowUploadedFileModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Vitals Modal */}
      {showShareVitalsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-stable">
              <h3>Share Vitals with Doctor</h3>
              <CloseButton onClick={() => setShowShareVitalsModal(false)} />
            </div>
            <div className="modal-body">
              <p>Select which vitals you want to share:</p>
              <div className="vital-selection">
                {Object.entries(vitals)
                  .filter(([key, data]) => data.value && data.value.trim() !== '')
                  .map(([key, data]) => (
                    <label key={key} className="vital-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedVitalsToShare.includes(key)} 
                        onChange={(e) => {
                          if (e.target.checked) setSelectedVitalsToShare([...selectedVitalsToShare, key]);
                          else setSelectedVitalsToShare(selectedVitalsToShare.filter(k => k !== key));
                        }} 
                      />
                      <span>
                        {key === 'bloodPressure' ? 'Blood Pressure' : 
                         key === 'bloodSugar' ? 'Blood Sugar' : 
                         key === 'heartRate' ? 'Heart Rate' : 
                         key === 'fetalHeartRate' ? 'Fetal Heart Rate' :
                         key.charAt(0).toUpperCase() + key.slice(1)}: {data.value}
                      </span>
                    </label>
                ))}
              </div>
            </div>
            <div className="modal-footer gap-10">
              <button className="button" onClick={shareVitalsWithDoctor} disabled={selectedVitalsToShare.length === 0}>
                <Icon name="share" size={18} /> Share Selected Vitals
              </button>
              <button className="secondary-button" onClick={() => setShowShareVitalsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate AI Plan Modal */}
      {showRegenerationModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header-stable">
              <h3><Icon name="ai" size={24} /> Regenerating AI Diet Plan</h3>
              <CloseButton onClick={() => {
                if (!regeneratingPlan) {
                  setShowRegenerationModal(false);
                }
              }} />
            </div>
            
            <div className="modal-body text-center">
              <div className="ai-regeneration-animation">
                <div className="spinner-large" style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #3498db',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <h4>AI is generating your personalized diet plan</h4>
                <p>Analyzing Month {currentMonth} nutritional needs...</p>
                
                <div className="ai-steps" style={{ margin: '20px 0' }}>
                  <div className={`ai-step ${regenerationProgress >= 33 ? 'active' : ''}`}>
                    <Icon name="ai" size={20} color={regenerationProgress >= 33 ? '#4CAF50' : '#ccc'} />
                    <span>Analyzing nutritional requirements</span>
                  </div>
                  <div className={`ai-step ${regenerationProgress >= 66 ? 'active' : ''}`}>
                    <Icon name="nutrition" size={20} color={regenerationProgress >= 66 ? '#4CAF50' : '#ccc'} />
                    <span>Optimizing meal combinations</span>
                  </div>
                  <div className={`ai-step ${regenerationProgress >= 100 ? 'active' : ''}`}>
                    <Icon name="check" size={20} color={regenerationProgress >= 100 ? '#4CAF50' : '#ccc'} />
                    <span>Generating personalized plan</span>
                  </div>
                </div>
                
                <div className="progress-bar mt-20">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${regenerationProgress}%` }}
                  />
                </div>
                <div className="flex-between mt-5">
                  <small>{regenerationProgress}% Complete</small>
                  <small>{regeneratingPlan ? 'Processing...' : 'Complete!'}</small>
                </div>
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  if (!regeneratingPlan) {
                    setShowRegenerationModal(false);
                  }
                }}
                disabled={regeneratingPlan}
              >
                {regeneratingPlan ? 'Please wait...' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Diet Plan Modal */}
      {showShareModal && shareOptions && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header-stable">
              <h3><Icon name="share" size={24} /> {shareOptions.title}</h3>
              <CloseButton onClick={() => {
                setShowShareModal(false);
                setSelectedShareOption('');
              }} />
            </div>
            
            <div className="modal-body">
              <div className="share-options">
                <p>{shareOptions.message}</p>
                
                <div className="share-option-grid">
                  {shareOptions.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`share-option ${selectedShareOption === option ? 'selected' : ''}`}
                      onClick={() => setSelectedShareOption(option)}
                    >
                      <Icon 
                        name={
                          option === 'Copy Link' ? 'link' :
                          option === 'Send Email' ? 'mail' :
                          option === 'Download PDF' ? 'download' :
                          option === 'Share with Doctor' ? 'doctor' :
                          'share'
                        } 
                        size={24} 
                      />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                
                {selectedShareOption && (
                  <div className="share-details mt-20">
                    <h4>Share Details</h4>
                    <div className="input-group">
                      <label>Share Message (Optional)</label>
                      <textarea 
                        className="textarea" 
                        placeholder={`Add a message for ${selectedShareOption.toLowerCase()}...`}
                        rows="3"
                        defaultValue={`Hi, I'd like to share my Month ${currentMonth} pregnancy diet plan for review.`}
                        id="share-message"
                      />
                    </div>
                    
                    {selectedShareOption === 'Download PDF' && (
                      <div className="card mt-15" style={{ background: '#f0f7ff' }}>
                        <h5><Icon name="download" size={18} /> PDF Download Options</h5>
                        <div className="checkbox-group mt-10">
                          <label className="checkbox">
                            <input type="checkbox" defaultChecked id="include-nutrition-tips" />
                            <span>Include nutrition tips</span>
                          </label>
                          <label className="checkbox">
                            <input type="checkbox" defaultChecked id="include-meal-timings" />
                            <span>Include meal timings</span>
                          </label>
                          <label className="checkbox">
                            <input type="checkbox" id="include-shopping-list" />
                            <span>Include shopping list</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  if (!selectedShareOption) {
                    alert('Please select a sharing option');
                    return;
                  }
                }}
                disabled={!selectedShareOption}
              >
                <Icon name="share" size={18} /> {selectedShareOption}
              </button>
              <button 
                className="secondary-button" 
                onClick={() => {
                  setShowShareModal(false);
                  setSelectedShareOption('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Cancelled Modal */}
      {showPaymentCancelledModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <div className="modal-header-stable">
              <h3>Payment Cancelled</h3>
              <CloseButton onClick={() => setShowPaymentCancelledModal(false)} />
            </div>
            
            <div className="modal-body text-center">
              <div style={{ fontSize: '48px', color: '#ff6b6b', marginBottom: '20px' }}>
                ❌
              </div>
              <h4>Package Payment Cancelled</h4>
              <p style={{ color: '#666', margin: '15px 0' }}>
                {paymentCancelledMessage || 'Your payment was cancelled. You can try again.'}
              </p>
              
              <div className="card mt-20" style={{ background: '#fff9e6', textAlign: 'left' }}>
                <div className="flex gap-15">
                  <Icon name="info" size={24} color="#f39c12" />
                  <div>
                    <strong>What happened?</strong>
                    <p style={{ fontSize: '14px', marginTop: '5px' }}>
                      The payment process was interrupted or cancelled. Your pregnancy package was not activated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              <button 
                className="button" 
                onClick={() => {
                  setShowPaymentCancelledModal(false);
                  // Redirect to package plans
                  setActiveTab('plans');
                }}
              >
                <Icon name="arrowRight" size={18} /> View Care Packages
              </button>
              <button 
                className="secondary-button" 
                onClick={() => setShowPaymentCancelledModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Details Modal */}
      {showPackageDetailsModal && selectedPackageDetails && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header-stable">
              <h3><Icon name="package" size={24} /> {selectedPackageDetails.title}</h3>
              <CloseButton onClick={() => setShowPackageDetailsModal(false)} />
            </div>
            
            <div className="modal-body">
              <div className="package-details-header">
                <div className="package-price-large">
                  <Icon name="rupee" size={32} color="#7C2A62" />
                  <span className="price">{selectedPackageDetails.price.toLocaleString()}</span>
                  <span className="duration">{selectedPackageDetails.duration}</span>
                </div>
                <div className="patients-count">
                  <Icon name="users" size={16} /> {selectedPackageDetails.patientsEnrolled}
                </div>
              </div>
              
              <p className="package-description">
                {selectedPackageDetails.description}
              </p>
              
              <div className="features-list">
                <h4><Icon name="check" size={20} color="#4CAF50" /> Package Includes:</h4>
                <ul>
                  {selectedPackageDetails.features.map((feature, index) => (
                    <li key={index}>
                      <Icon name="check" size={16} color="#4CAF50" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="benefits-section">
                <h4><Icon name="star" size={20} color="#FFC107" /> Benefits:</h4>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <Icon name="doctor" size={24} />
                    <span>Expert Doctors</span>
                  </div>
                  <div className="benefit-item">
                    <Icon name="hospital" size={24} />
                    <span>Hospital Delivery</span>
                  </div>
                  <div className="benefit-item">
                    <Icon name="nutrition" size={24} />
                    <span>Nutrition Support</span>
                  </div>
                  <div className="benefit-item">
                    <Icon name="homevisit" size={24} />
                    <span>Home Convenience</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer gap-10">
              {activePregnancyPackage?.planId === selectedPackageDetails.id ? (
                <div className="active-subscription" style={{ width: '100%' }}>
                  <Icon name="check" size={20} color="#4CAF50" />
                  <span>You have this active package</span>
                </div>
              ) : (
                <>
                  <button 
                    className="button" 
                    onClick={() => {
                      setShowPackageDetailsModal(false);
                      handleSubscribe(selectedPackageDetails); // Use handleSubscribe from UserDashboard (Razorpay)
                    }}
                  >
                    <Icon name="package" size={18} /> Subscribe Now
                  </button>
                  <button 
                    className="secondary-button" 
                    onClick={() => setShowPackageDetailsModal(false)}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share with Doctor Link Modal */}
      {showShareDoctorModal && shareDoctorData && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header-stable">
              <h3><Icon name="share" size={24} /> Share with Doctor</h3>
              <CloseButton onClick={() => {
                setShowShareDoctorModal(false);
                setShareDoctorData(null);
              }} />
            </div>
            
            <div className="modal-body">
              <div className="share-link-container">
                <div className="share-link-header">
                  <Icon name="doctor" size={32} color="#7C2A62" />
                  <div>
                    <h4>Secure Share Link Generated</h4>
                    <p>Share this link with your doctor for review</p>
                  </div>
                </div>
                
                <div className="share-link-card">
                  <div className="link-display">
                    <input 
                      type="text" 
                      value={shareDoctorData.shareLink}
                      readOnly
                      className="link-input"
                      onClick={(e) => e.target.select()}
                    />
                    <button 
                      className="copy-button"
                      onClick={() => {
                        navigator.clipboard.writeText(shareDoctorData.shareLink);
                        addNotification('Link Copied', 'Share link copied to clipboard', 'success');
                      }}
                    >
                      <Icon name="copy" size={18} /> Copy
                    </button>
                  </div>
                  
                  <div className="share-details">
                    <div className="detail-item">
                      <Icon name="lock" size={16} color="#4CAF50" />
                      <span>Secure Access Code: <strong>{shareDoctorData.accessCode}</strong></span>
                    </div>
                    <div className="detail-item">
                      <Icon name="calendar" size={16} color="#666" />
                      <span>Expires in 7 days</span>
                    </div>
                    <div className="detail-item">
                      <Icon name="eye" size={16} color="#666" />
                      <span>Doctor-only access • Encrypted</span>
                    </div>
                  </div>
                </div>
                
                {shareDoctorData.type === 'package' ? (
                  <div className="package-share-preview">
                    <h5>Package Details:</h5>
                    <div className="preview-card">
                      <h4>{shareDoctorData.data.title}</h4>
                      <p>{shareDoctorData.data.description}</p>
                      <div className="preview-features">
                        <strong>Features:</strong>
                        <ul>
                          {shareDoctorData.data.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="records-share-summary">
                    <h5>What you're sharing:</h5>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <Icon name="activity" size={20} />
                        <span>{shareDoctorData.data.vitals.length} Health Vitals</span>
                      </div>
                      <div className="summary-item">
                        <Icon name="file" size={20} />
                        <span>{shareDoctorData.data.reports} Medical Reports</span>
                      </div>
                      <div className="summary-item">
                        <Icon name="calendar" size={20} />
                        <span>Week {shareDoctorData.data.currentWeek} of Pregnancy</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="share-options-buttons">
                  <button 
                    className="button"
                    onClick={() => {
                      const emailSubject = encodeURIComponent(shareDoctorData.title);
                      const emailBody = encodeURIComponent(
                        `Dear Doctor,\n\n` +
                        `${shareDoctorData.text}\n\n` +
                        `Please review using this secure link:\n${shareDoctorData.shareLink}\n\n` +
                        `Access Code: ${shareDoctorData.accessCode}\n\n` +
                        `Best regards,\n${user?.fullName || 'Patient'}`
                      );
                      window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`, '_blank');
                    }}
                  >
                    <Icon name="mail" size={18} /> Send via Email
                  </button>
                  
                  <button 
                    className="secondary-button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: shareDoctorData.title,
                          text: `${shareDoctorData.text}\n\nAccess Code: ${shareDoctorData.accessCode}`,
                          url: shareDoctorData.shareLink
                        });
                      }
                    }}
                  >
                    <Icon name="share" size={18} /> Share via App
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowShareDoctorModal(false);
                  setShareDoctorData(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyCareView;
