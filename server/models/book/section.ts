import { Section } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { TopicProps, TopicSchema, topicSchema } from "$server/models/topic";

export type SectionProps = {
  name?: Section["name"];
  topics: Array<TopicProps>;
};

export type SectionSchema = Pick<Section, "id" | "name"> & {
  topics: TopicSchema[];
};

const { id, name } = jsonSchema.definitions.Section.properties;
export const sectionSchema = {
  type: "object",
  properties: {
    id,
    name,
    topics: {
      type: "array",
      items: topicSchema,
    },
  },
};
