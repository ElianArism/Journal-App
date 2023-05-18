import { ImageList, ImageListItem } from "@mui/material";
import { memo } from "react";

export const ImgGallery = memo(({ images }) => {
  return (
    <ImageList
      sx={{ margin: "auto", my: 2, width: "80%", height: 500 }}
      cols={4}
      rowHeight={200}
    >
      {images.map((img, i) => (
        <ImageListItem key={i}>
          <img
            src={`${img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={"image " + (i + 1)}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
});
