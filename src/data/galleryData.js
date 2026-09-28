/* =========================================================
   CULTURAL SUB-COUNCIL
   GALLERY DATA
========================================================= */

/*
  ==========================================================
  STOCK IMAGE GALLERY

  Photos and videos are kept in separate arrays.

  order:
    Controls the position in the combined gallery.

  size:
    normal = 1 × 1
    tall   = 1 × 2
    wide   = 2 × 1
    large  = 2 × 2

  NOTE:
    These are stock-image URLs.
    For production, I recommend downloading approved
    stock images and placing them in /public/gallery/
    so your website does not depend on external image URLs.
  ==========================================================
*/


/* =========================================================
   PHOTOS
========================================================= */

export const galleryPhotos = [
  {
    id: "photo-01",
    type: "photo",
    order: 1,
    category: "Events",
    title: "Cultural Celebration",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-02",
    type: "photo",
    order: 3,
    category: "Dance",
    title: "Expressions in Motion",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    size: "tall",
  },

  {
    id: "photo-03",
    type: "photo",
    order: 5,
    category: "Music",
    title: "Music & Melodies",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-04",
    type: "photo",
    order: 7,
    category: "Fine Arts",
    title: "Art in Expression",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1600&q=80",
    size: "wide",
  },

  {
    id: "photo-05",
    type: "photo",
    order: 8,
    category: "Events",
    title: "Campus Stories",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-06",
    type: "photo",
    order: 10,
    category: "Technical & Photography",
    title: "Through Our Lens",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    size: "tall",
  },

  {
    id: "photo-07",
    type: "photo",
    order: 12,
    category: "Dance",
    title: "Rhythm & Energy",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-08",
    type: "photo",
    order: 14,
    category: "Fine Arts",
    title: "Colours of Creativity",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-09",
    type: "photo",
    order: 16,
    category: "Dramatics",
    title: "Stories on Stage",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=80",
    size: "wide",
  },

  {
    id: "photo-10",
    type: "photo",
    order: 17,
    category: "Events",
    title: "A Night to Remember",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-11",
    type: "photo",
    order: 19,
    category: "Technical & Photography",
    title: "Captured Moments",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-12",
    type: "photo",
    order: 21,
    category: "Music",
    title: "Voices & Vibrations",
    image:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-13",
    type: "photo",
    order: 23,
    category: "Events",
    title: "Moments Together",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    size: "large",
  },

  {
    id: "photo-14",
    type: "photo",
    order: 25,
    category: "Dance",
    title: "Movement & Expression",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },

  {
    id: "photo-15",
    type: "photo",
    order: 27,
    category: "Fine Arts",
    title: "Creative Perspectives",
    image:
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&w=1200&q=80",
    size: "tall",
  },

  {
    id: "photo-16",
    type: "photo",
    order: 29,
    category: "Dramatics",
    title: "On the Stage",
    image:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80",
    size: "normal",
  },
];


/* =========================================================
   VIDEOS
========================================================= */

/*
  IMPORTANT:

  Keep the video structure exactly the same because
  GalleryVideo.jsx expects:

    thumbnail → preview image
    video     → actual MP4

  You can replace the thumbnail URLs with stock images.

  For actual videos, use your own MP4 files or properly
  licensed stock footage.
*/

export const galleryVideos = [
  {
    id: "video-01",
    type: "video",
    order: 2,
    category: "Events",
    title: "Moments from the Stage",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-01.mp4",
    size: "tall",
  },

  {
    id: "video-02",
    type: "video",
    order: 4,
    category: "Dramatics",
    title: "Behind the Curtain",
    thumbnail:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-02.mp4",
    size: "normal",
  },

  {
    id: "video-03",
    type: "video",
    order: 6,
    category: "Music",
    title: "Live Performance",
    thumbnail:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-03.mp4",
    size: "tall",
  },

  {
    id: "video-04",
    type: "video",
    order: 9,
    category: "Dance",
    title: "Dance Rehearsal",
    thumbnail:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-04.mp4",
    size: "normal",
  },

  {
    id: "video-05",
    type: "video",
    order: 11,
    category: "Events",
    title: "Cultural Highlights",
    thumbnail:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-05.mp4",
    size: "wide",
  },

  {
    id: "video-06",
    type: "video",
    order: 13,
    category: "Music",
    title: "Voices on Stage",
    thumbnail:
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-06.mp4",
    size: "normal",
  },

  {
    id: "video-07",
    type: "video",
    order: 15,
    category: "Dance",
    title: "Rhythm in Motion",
    thumbnail:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-07.mp4",
    size: "tall",
  },

  {
    id: "video-08",
    type: "video",
    order: 18,
    category: "Dramatics",
    title: "A Story Unfolds",
    thumbnail:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-08.mp4",
    size: "normal",
  },

  {
    id: "video-09",
    type: "video",
    order: 20,
    category: "Technical & Photography",
    title: "Behind the Lens",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-09.mp4",
    size: "tall",
  },

  {
    id: "video-10",
    type: "video",
    order: 22,
    category: "Events",
    title: "Celebrating Together",
    thumbnail:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-10.mp4",
    size: "normal",
  },

  {
    id: "video-11",
    type: "video",
    order: 24,
    category: "Fine Arts",
    title: "Art in Motion",
    thumbnail:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-11.mp4",
    size: "wide",
  },

  {
    id: "video-12",
    type: "video",
    order: 26,
    category: "Music",
    title: "Melodies & Memories",
    thumbnail:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-12.mp4",
    size: "normal",
  },

  {
    id: "video-13",
    type: "video",
    order: 28,
    category: "Events",
    title: "The Cultural Journey",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-13.mp4",
    size: "tall",
  },

  {
    id: "video-14",
    type: "video",
    order: 30,
    category: "Technical & Photography",
    title: "Captured Through Technology",
    thumbnail:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=75",
    video: "/gallery/videos/reel-14.mp4",
    size: "normal",
  },
];


/* =========================================================
   COMBINED GALLERY
========================================================= */

export const galleryItems = [
  ...galleryPhotos,
  ...galleryVideos,
].sort((a, b) => a.order - b.order);


/* =========================================================
   FILTER CATEGORIES
========================================================= */

export const galleryCategories = [
  "All",
  "Events",
  "Dance",
  "Dramatics",
  "Music",
  "Fine Arts",
  "Technical & Photography",
];


/* =========================================================
   FILTER HELPER
========================================================= */

export function getGalleryByCategory(category) {
  if (category === "All") {
    return galleryItems;
  }

  return galleryItems.filter(
    (item) => item.category === category
  );
}