import { Box } from "@mui/material";

interface CaretLeafProps {
  color: string;
  isForward: boolean;
  name: string;
}

export const CaretLeaf = ({ color, isForward, name }: CaretLeafProps) => {
  return (
    <Box component="span" sx={{ position: "relative" }}>
      <Box
        contentEditable={false}
        component="span"
        sx={{
          position: "absolute",
          pointerEvents: "none",
          userSelect: "none",
          height: "1.2em",
          width: 2,
          background: color,
          left: isForward ? "100%" : "0%",
          bottom: isForward ? 0 : "auto",
          top: isForward ? "auto" : 0,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            contentEditable={false}
            component="span"
            sx={{
              position: "absolute",
              top: -2,
              pointerEvents: "none",
              userSelect: "none",
              transform: "translateY(-100%)",
              fontSize: 10,
              color: "white",
              whiteSpace: "nowrap",
              background: color,
              left: isForward ? "100%" : "0%",
            }}
          >
            {name}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
