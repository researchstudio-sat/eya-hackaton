export interface Profile {
  name: string;
  grade: number;
  topic: string;
}

export interface CompetenceProfile {
  profile: Profile;
  competences: Array<CompetenceLevel>;
}

export interface CompetencePlan {
  competenceProfile: CompetenceProfile;
  focusCompetence: Competence;
  targetCompetences: Array<Competence>;
}

export interface Method {
  type: string;
  duration: number;
  title: string;
  minimum_class: number;
  description: string;
  hints: string;
  reason: string;
  grades: Array<number>;
  minAge: number;
  competence: Competence;
  requiredCompetences: Array<CompetenceLevel>;
  competenceLevel: number;
}

export interface Competence {
  name: string;
  levelLabels: Map<number, string>;
}

export interface CompetenceLevel {
  competence: Competence;
  level: number;
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
  competences: Array<Competence>,
  methods: Array<Method>
): Array<Method> {
  return methods;
}
