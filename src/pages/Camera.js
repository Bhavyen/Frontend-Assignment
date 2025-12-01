import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Camera = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);
  const navigate = useNavigate();
  let currentStream = null;

  

  // Stop old camera stream before starting a new one
  const stopCamera = () => {
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
    }
  };

  // Start camera feed
  const startCamera = async (deviceId) => {
    try {
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } }
      });

      currentStream = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error starting camera:", err);
    }
  };

  // Load all cameras
  const loadCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cams = devices.filter((d) => d.kind === "videoinput");

    setDevices(cams);

    // If at least one exists, select the first by default
    if (cams.length > 0) {
      setSelectedDeviceId(cams[0].deviceId);
      startCamera(cams[0].deviceId);
    }
  };

  // Load cameras on mount
  useEffect(() => {
    loadCameras();

    return () => stopCamera(); 
  }, []);

  // Handle dropdown camera switch
  const handleCameraChange = (e) => {
    const id = e.target.value;
    setSelectedDeviceId(id);
    startCamera(id);
  };

  return (
    <Layout>
      <div className="container mt-4">
        

        <div className="mt-3">
          <label className="form-label"><strong>Select Camera</strong></label>
          <select
            className="form-select"
            value={selectedDeviceId}
            onChange={handleCameraChange}
          >
            {devices.map((device, index) => (
              <option key={index} value={device.deviceId}>
                {device.label || `Camera ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mt-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="border rounded shadow"
            width={600}
            height={400}
          ></video>
        </div>
      </div>
    </Layout>
  );
};

export default Camera;
