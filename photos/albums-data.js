/* =========================================================
   PHOTO ALBUM MANIFEST
   This file tells the gallery on about.html which photos
   exist in each album folder. There's no server here to
   auto-list files, so whenever you add or remove a photo,
   add or remove its filename in the matching array below.

   HOW TO ADD PHOTOS:
   1. Drop the image file into the matching folder inside
      /photos, e.g. photos/seminars-and-trainings/img1.jpg
   2. Add that same filename as a string in the "photos"
      array for that album, in the order you want it shown.
   3. Save this file and refresh the page — no other code
      needs to change.
   ========================================================= */

window.PHOTO_ALBUMS = [{
        id: "seminars-and-trainings",
        title: "Seminars and Trainings",
        folder: "photos/seminars-and-trainings",
        photos: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg",
            "6.jpg",
            "7.jpg",
            "8.jpg",
            "9.jpg",
            "10.jpg",
            "11.jpg",
            "12.jpg",
            "13.jpg",
        ],
    },
    {
        id: "bsit-it-exhibits-2025",
        title: "BSIT IT Exhibits 2025",
        folder: "photos/bsit-it-exhibits-2025",
        photos: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg",
            "6.jpg",
            "7.jpg",
            "8.jpg",
            "9.jpg",
            "10.jpg",
            "11.jpg",
            "12.jpg",
            "13.jpg",
        ],
    },
    {
        id: "bsit-it-exhibits-2026",
        title: "BSIT IT Exhibits 2026",
        folder: "photos/bsit-it-exhibits-2026",
        photos: [
            "1.jpg",
            "2.jpg",
            "3.jpg",
            "4.jpg",
            "5.jpg",
            "6.jpg",
            "7.jpg",
            "8.jpg",
            "9.jpg",
            "10.jpg",
            "11.jpg",
            "12.jpg",
            "13.jpg",
        ],
    },
    {
        id: "capstone-defense-2025",
        title: "Capstone Defense 2025",
        folder: "photos/capstone-defense-2025",
        photos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    },
    {
        id: "msit-graduates",
        title: "MSIT Graduate",
        folder: "photos/msit-graduates",
        photos: ["1.jpg", "2.jpg"],
    },
];