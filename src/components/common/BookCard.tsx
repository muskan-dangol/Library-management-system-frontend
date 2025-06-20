import { Box, Paper, Typography } from "@mui/material";

type BookProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  book: any;
};

export const BookCard: React.FC<BookProps> = ({ book: book }) => {
  return (
    <Paper
      key={book.id}
      sx={{
        position: "relative",
        maxHeight: "40vh",
        width: "100%",
        aspectRatio: "2 / 3",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={book.image}
        alt={`${book.title} cover`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "flex",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: 2,
          color: "white",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.2rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          Author: {book.author}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          Release: {book.release_date?.slice(0, 10) || "N/A"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {book.short_description}
        </Typography>
      </Box>
    </Paper>
  );
};
