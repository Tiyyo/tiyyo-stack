# Project "tiyyo-stack" - Monorepo template starter

The "tiyyo-stack" project is a monorepo project template designed to quickly start projects without the need for extensive configurations. It uses TypeScript pnpm as the package manager. The current stack of the project includes the following technologies:

- Express
- React with Vite
- Zod
- Tailwind
- SQLite with Prisma

## Installation

Clone the repository:

```
git clone https://github.com/Tiyyo/tiyyo-stack.git`
```

Install all project dependencies at the root directory:

```
pnpm install
```

## Adding a New Workspace

To add a new workspace, follow these steps :

- Create a new folder in the "packages" or "@app" directory.
- Navigate to the root of the newly created folder.
- Run the following command to initialize the new workspace:

```
pnpm init
```

By convention, workspace name should start with > @project-name/workspace.

## Accessing a Specific Workspace

To access a particular workspace, use the --filter option with pnpm. Here's how:

```
pnpm --filter <workspace-name>
```

There is a script in the root package.json file that allows you to access a workspace quickly using this command:

```
pnpm <workspace-name>
```

## Installing a Workspace as a Dependency on Another Workspace

If you want to install a workspace as a dependency on another workspace, use the following command:

```
pnpm --filter <workspace-name> add <workspace-name>@workspace:x
```

For example, to add the "tailwind-config" workspace as a dependency on the "client" workspace, use:

```
pnpm --filter @tiyyo-stack/client add @tiyyo-stack/tailwind-config@workspace:x
```

with script

```
pnpm client add @tiyyo-stack/tailwind-config@workspace:x
```

If you want to contribute to the project, feel free to create a pull request

We would be glad to review your contributions and collaborate with you to improve the "tiyyo-stack" project template.
