import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 5,
                height: "600px",
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                marginTop: "20px",
                marginLeft: "40px",
                ...sx,
            }}
            {...other}
        />
    );
}
export default Item;