"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { CourseList } from "./_components/course/list";
import { CourseCreate } from "./_components/course/create";
import { CourseEdit } from "./_components/course/edit";

import { UnitList } from "./_components/unit/list";
import { UnitCreate } from "./_components/unit/create";
import { UnitEdit } from "./_components/unit/edit";

import { LessonList } from "./_components/lesson/list";
import { LessonCreate } from "./_components/lesson/create";
import { LessonEdit } from "./_components/lesson/edit";

import { ChallengeList } from "./_components/challenge/list";
import { ChallengeCreate } from "./_components/challenge/create";
import { ChallengeEdit } from "./_components/challenge/edit";

import { ChallengeOptionList } from "./_components/challengeOption/list";
import { ChallengeOptionCreate } from "./_components/challengeOption/create";
import { ChallengeOptionEdit } from "./_components/challengeOption/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource
        name="challengeOptions"
        recordRepresentation="text"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default App;
