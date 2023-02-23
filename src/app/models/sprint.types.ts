import { Story } from "./story.types";

export interface Sprint {
    name: string;
    capacity: number;
    stories: Story[];
}
