interface IStyleRules {
  [ruleName: string]: string;
}

declare const ruleNames: IStyleRules;

declare module "*.css" {
  export = ruleNames;
}

declare module "*.scss" {
  export = ruleNames;
}
