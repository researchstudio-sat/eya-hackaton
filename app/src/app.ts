type CompetenceId = number;
type MethodId = number;

export interface Profile {
  firstName: string;
  lastName: string;
  grade: number;
  topic: string;
}

export interface CompetenceProfile {
  profile: Profile;
  competences: Array<CompetenceLevel>;
}

export interface CompetencePlan {
  competenceProfile: CompetenceProfile;
  focusCompetenceId: CompetenceId;
  targetCompetencesIds: Array<CompetenceId>;
}

export interface Competence {
  competenceId: CompetenceId;
  name: string;
  levelLabels: Map<number, string>;
}

export interface CompetenceLevel {
  competenceId: CompetenceId;
  level: number;
}

export interface Method {
  methodId: MethodId;
  type: string;
  duration: number;
  title: string;
  minimum_class: number;
  description: string;
  hints: Array<string>;
  reason: string;
  requiredCompetences: Array<CompetenceLevel>;
}

export function suggestCurrentCompetences(
  profile: Profile,
  competences: Array<Competence>
): Array<Competence> {
  return competences;
}

export function suggestTargetCompetences(
  competenceProfile: CompetenceProfile,
  competences: Array<Competence>
): Array<Competence> {
  return competences;
}

export function suggestMethods(
  competencePlan: CompetencePlan,
  methods: Array<Method>
): Array<Method> {
  const filteredMethods = methods.filter(
    // filter age
    method =>
      competencePlan.competenceProfile.profile.grade >= method.minimum_class
  );

  return calculateDependencies(filteredMethods, competencePlan);
}

export function calculateDependencies(
  methods: Array<Method>,
  competencePlan: CompetencePlan
): Array<Method> {
  //Calculate score for every Track

  return methods
    .sort(
      (method1, method2) =>
        calculateMethodScore(method2, competencePlan) -
        calculateMethodScore(method1, competencePlan)
    )
    .filter(methods => calculateMethodScore(methods, competencePlan) > 0.2);
}

export function calculateMethodScore(
  method: Method,
  competencePlan: CompetencePlan
): number {
  return method.requiredCompetences
    .map(reqComp =>
      competencePlan.competenceProfile.competences
        .map(comp => {
          if (reqComp.competenceId == comp.competenceId) {
            const diff = reqComp.level - comp.level;
            return 1 / (Math.pow(diff, 2) + 1);
          } else return 0;
        })
        .reduce((l, r) => l + r, 0)
    )
    .reduce((l, r) => (l > r ? l : r), 0);
}

export function getCompetenceById(
  id: CompetenceId,
  comptetences: Array<Competence>
): Competence | undefined {
  return comptetences.find(comptetence => comptetence.competenceId == id);
}
export function findMethodById(
  id: MethodId,
  methods: Array<Method>
): Method | undefined {
  return methods.find(method => method.methodId == id);
}

//TEST

const availableCompetences: Array<Competence> = [
  {
    competenceId: 1,
    name: "Creativity and Innovation",
    levelLabels: new Map([
      [1, "Think Creatively"],
      [2, "Work Creatively with Others"],
      [3, "Implement Innovations"]
    ])
  },
  {
    competenceId: 2,
    name: "Critical Thinkind and Problem Solving",
    levelLabels: new Map([
      [1, "Reason Effectively"],
      [2, "Use System Thinking"],
      [3, "Make Judgement and Desicions"],
      [4, "Solve Problems"]
    ])
  }
];

const methods: Array<Method> = [
  {
    methodId: 99,
    type: "Ritual",
    duration: 10,
    title: "Saying Yes",
    minimum_class: 2,
    description: `
      Effective interaction relies on positive communication and integration of
      feedback. This ritual can be used to encourage students to take turns in speaking,
      build on each other’s ideas and  model the skill of giving and receiving constructive 
      feedback.
      `,
    hints: [],
    reason: `
      Feedback is an essential skill for life and career,
      that can drive connection and improve performance.
      `,
    requiredCompetences: [
      { competenceId: 1, level: 5 },
      { competenceId: 2, level: 5 }
    ]
  },
  {
    methodId: 98,
    type: "Classroom management",
    duration: 15,
    title: "A First Sight",
    minimum_class: 7,
    description: `
  This method is especially effective with newly-formed groups, where people don’t know
  each other very well, but also works well with established groups. It gives students the
  opportunity to give each other positive feedback..
    `,
    hints: [],
    reason: `
    empty.
    `,
    requiredCompetences: [{ competenceId: 1, level: 4 }]
  }
];

const lisasProfile: Profile = {
  firstName: "Lisa",
  lastName: "Doe",
  grade: 6,
  topic: "Pysics"
};

const lisasCompetenceProfile: CompetenceProfile = {
  profile: lisasProfile,
  competences: [{ competenceId: 1, level: 5 }, { competenceId: 2, level: 2 }]
};

const lisasCompetencePlan: CompetencePlan = {
  competenceProfile: lisasCompetenceProfile,
  focusCompetenceId: 1,
  targetCompetencesIds: [1, 2, 3]
};

export function Test() {
  console.log("Start Tests");
  const testMethods = generateTestMethods(100).concat(methods);
  const result1 = suggestMethods(lisasCompetencePlan, testMethods);
  console.log("test 1 result: ", result1);
  console.log("Finished Tests");
}

export function generateTestMethods(size: number): Array<Method> {
  let methods = Array<Method>();
  for (let i = 0; i < size; i++) {
    methods.push({
      methodId: i,
      type: "Classroom management",
      duration: getRandomInt(120),
      title: "Random Method " + i,
      minimum_class: getRandomInt(8),
      description: `
    This method is auto created to get test data
      `,
      hints: [],
      reason: `
      empty.
      `,
      requiredCompetences: [
        { competenceId: getRandomInt(10), level: getRandomInt(10) }
      ]
    });
  }

  return methods;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
