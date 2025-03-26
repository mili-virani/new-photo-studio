import React, { useEffect, useState } from "react";
import circleImage from "../assets/img/more/circle.png";
import backgroundImage from "../assets/img/background/page-header-bg-8.jpg";
import {getAllPhotos} from "../utils/api";
import "../assets/css/gallery.css";

const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getAllPhotos();
        setProjects(data);
      } catch (error) {
        setError("Failed to load gallery data.");
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  });

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage(e);
      if (e.key === "ArrowRight") nextImage(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className={`wrapper ${selectedImage !== null ? "blur-background" : ""}`}>
      {/* Page Header */}
      <div className="wptb-page-heading">
        <div
          className="wptb-item--inner"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="wptb-item-layer wptb-item-layer-one">
            <img src={circleImage} alt="circle" />
          </div>
          <h2 className="wptb-item--title">Our Photos</h2>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-5">
        <div className="container">
          <div className="wptb-heading text-center mb-4">
            <h1 className="wptb-item--title">Beautiful memories are captured here</h1>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <div className="row">
              {projects.map((project, index) => (
                <div key={project._id} className="col-md-4 mb-4">
                  <div
                    className="card bg-transparent border-none shadow-lg"
                    onClick={() => openModal(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`http://68.183.93.60/py/face_recognization/${project.photopath}`}
                      alt={project.title}
                      className="card-img-top img-fluid object-fit-cover"
                      style={{ height: "500px", width: "100%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for Image Preview */}
      {selectedImage !== null && (
        <div className="modal-overlay-gallery" onClick={closeModal}>
          <div className="modal-content-gallery" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn-gallery" onClick={closeModal} >
            &times;</button>
            <button className="nav-btn left" onClick={prevImage} >&#10094;</button>
            <img src={`http://68.183.93.60/py/face_recognization/${projects[selectedImage].photopath}`} alt="Preview" className="modal-image-gallery" />
            <button className="nav-btn right" onClick={nextImage}>&#10095;</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
