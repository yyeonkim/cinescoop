import { mode } from "@chakra-ui/theme-tools"
import { Dict } from "@chakra-ui/utils"

export const styles = {
    global: (props: Dict<any>) => ({
        body: {
            bg: mode('white', 'darkBlue')(props),
            color: mode('darkBlue', 'white')(props),
        }
    })
}