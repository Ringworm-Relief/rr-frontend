import CheckIcon from '@mui/icons-material/Check';
import {Box, Chip, RadioGroup, Radio } from '@mui/joy'
import ForumCategory from './forumComponents/ForumCategory';
interface Props {
    forumData: any[];
    filter: string;
    setFilter: (filter: string) => void;
}

export default function Forum({ forumData, filter, setFilter }: Props) {
    // const forumCategories = forumData.map((post) => post.category);
    // const forumCat = forumData.filter((post) => post.category === filter);
    return (
        <div>
        <h1>{filter}</h1>
        <Box>
            <RadioGroup>
               {["Cleaning", "Treatment", "General"].map((category) => {
                   const checked = filter === category
                return (
                    <Chip
                    key={category}
                    variant='plain'
                    color={checked ? 'primary' : 'neutral'}
                    startDecorator={
                      checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                    }
                  >
                    <Radio
                      variant="outlined"
                      color={checked ? 'primary' : 'neutral'}
                      disableIcon
                      overlay
                      label={category}
                      value={category}
                      checked={checked}
                      onChange={(e) => {
                        if(e.target.checked) {
                          setFilter(category)
                        }
                      }}
                    ></Radio>
                  </Chip>  
                )
               })} 
            </RadioGroup>
        </Box>
        </div>
    );
};