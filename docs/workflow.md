# Workflow

This document outlines our branch naming conventions and our work flow with git.
This document aims to answer the questions.

- How do we start work on a new feature
- How do we start work on a hot fix
- How do we start work on a bug
- How do we deploy to our testing/production env
- How do we release

## Objectives

- Define branch naming conventions
- Define static and throw away branches
- Define how to release
- Provide examples

## Environment Map

| Branch  | Environment    |
| :-----: | -------------- |
| master  | Production     |
| develop | Staging        |
| release | Pre-Production |

## Branch Naming

It is important to have a consistency when naming branches so that they are
easily identifiable and we can quickly understand what issue the branch aims to
resolve.

Below is a list of the branches their use case

| Prefix  | Use Case                                                          | Permanent |
| :-----: | ----------------------------------------------------------------- | --------- |
| master  | Production branch a merge will trigger a deploy to production env | true      |
| develop | Working branch a merge will trigger a deploy to staging           | true      |
| feature | Feature I'm adding or expanding                                   | false     |
|   sub   | Feature subtask                                                   | false     |
| release | Pre-Production branch a push will trigger a deploy to preprod env | false     |
| hotfix  | Hot fix an issue found in production                              | false     |
|   bug   | Bug fix an issue in staging or preprod                            | false     |

## Examples

Below are examples of how you would use the branches defined above.

### New Feature

When beginning work on a new feature we first need to branch out from develop
and create a new feature branch using the grouping prefix.

```bash
$ git co develop
$ git co -b feature/0000-loot-goals
```

Features can require many of file changes which may cause the PR's to be quite
large, in order to ensure we keep are PR's small and manageable, we should use
the story ticket number as the main feature branch and then continue to branch
out of the feature branch to complete the sub-tickets.

```
feature/0000-loot-goals
|-sub/0001-goals-ui
|-sub/0002-goals-api
```

Once a sub-ticket is completed, we should create a PR into the the main feature
branch _feature/0000-loot-goals_. Once all sub-tickets are completed we can
then create a PR into the the working branch(_develop_)

### Bug Fix

When beginning a bug ticket we should create a new branch using the bug group
prefix, from either the develop or release branch depending on which env the bug
is related to.

`bug/0004-transfer-goal-funds`

### Hot Fix

When beginning a hot fix ticket we should create a new branch using the hot fix
group prefix, from the master branch.

`hotfix/0005-deleting-goal`

### Releasing

When beginning a release we should create a new branch using the release group
prefix and the version number, from the develop branch.

```bash
$ git co develop
$ git co -b release/2.5.2
```

Creating this branch will trigger a release to preprod env, and allow QA team to
perform regression on all of the changes.

Any bugs that are found can be resolved following the flow for bug fixes above.

Once all of the issues are resolved and QA have given the ok ✅. we can then
merge that branch into master and develop, and then create a
[new release](https://github.com/Veriown/vown/releases),
uploading a copy of the current master

### Versioning

To version our application we follow [Semantic Versioning](https://semver.org/)
