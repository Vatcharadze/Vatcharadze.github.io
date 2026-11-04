// Your blog posts live here.
//
// To ADD a post: copy one of the objects below, paste it in the list,
// and change the slug, title, date, category, description, and content.
// To REMOVE a post: delete its object.
//
// Content blocks:
//   { type: 'heading',   text: 'A section title' }
//   { type: 'paragraph', text: 'Some text.' }
//   { type: 'paragraph', text: ['Text with ', { text: 'a link', href: 'https://example.com' }, '.'] }
//   { type: 'list',      items: ['First item', 'Second item'] }
//   { type: 'code',      code: 'echo "hello"' }

export const posts = [
  {
    slug: 'swx-folder-sorter',
    title: 'swx: a Python tool that sorts messy folders',
    date: '2026-10-14',
    category: 'Python',
    description:
      'A small command-line tool that moves loose files into folders like Documents, Images, and Videos based on their extension.',
    content: [
      {
        type: 'paragraph',
        text: 'swx is a small Python command-line tool that tidies up a messy folder. You point it at a directory, and it moves every loose file into a sub-folder based on the file extension. It uses only the Python standard library, so there is nothing extra to install.',
      },
      { type: 'heading', text: 'How it works' },
      {
        type: 'list',
        items: [
          'You pass a directory with the -p or --path option',
          'swx collects every file directly inside it and leaves sub-folders alone',
          'It checks each extension (case-insensitive, so .JPG and .jpg are the same)',
          'It creates the category folder if needed and moves the file into it',
          'Anything it does not recognize goes into an Others folder',
        ],
      },
      { type: 'heading', text: 'Installing and using it' },
      {
        type: 'paragraph',
        text: 'The easiest way to install swx is with pipx, which puts the swx command on your PATH in its own isolated environment:',
      },
      {
        type: 'code',
        code: 'pipx install git+https://github.com/Vatcharadze/swx.git\n\nswx -p ~/Downloads',
      },
      {
        type: 'paragraph',
        text: 'A folder with holiday.jpg, report.pdf, budget.xlsx, backup.zip, and movie.mp4 ends up with Images, Documents, Spreadsheets, Archives, and Videos folders, each holding the right file.',
      },
      { type: 'heading', text: 'Customizing the rules' },
      {
        type: 'paragraph',
        text: 'All the sorting rules live in one dictionary called EXTENSION_MAP in swx/extension_dict.py. To add a new rule, add one line:',
      },
      {
        type: 'code',
        code: "EXTENSION_MAP = {\n    '.pdf': 'Documents',\n    '.epub': 'Books',\n    # ...\n}",
      },
      { type: 'heading', text: 'Limitations' },
      {
        type: 'list',
        items: [
          'It is not recursive, so files inside sub-folders are untouched',
          'There is no undo or dry-run mode, so try it on a test folder first',
          'If a file with the same name already exists in the destination, the result depends on your operating system',
        ],
      },
      {
        type: 'paragraph',
        text: [
          'The full source code and instructions are on ',
          { text: 'GitHub', href: 'https://github.com/Vatcharadze/swx' },
          '.',
        ],
      },
    ],
  },
  {
    slug: 'aws-eks-cluster-terraform',
    title: 'Provisioning an AWS EKS cluster with Terraform',
    date: '2026-08-15',
    category: 'Terraform',
    description:
      'Terraform code that builds a VPC and an EKS cluster on AWS, deploys MySQL with Helm, and runs through a Jenkins pipeline.',
    content: [
      {
        type: 'paragraph',
        text: 'In this project I used Terraform to create a Kubernetes cluster on AWS from code. It also includes a Jenkins pipeline that runs the deployment automatically.',
      },
      { type: 'heading', text: 'What it creates' },
      {
        type: 'list',
        items: [
          'A VPC with 3 public subnets across eu-central-1a, 1b, and 1c, plus an internet gateway and a route table',
          'An EKS cluster built with the terraform-aws-modules/eks/aws module',
          'A managed node group using t2.micro instances, scaling from 1 to 3 nodes',
          'A Fargate profile for the eks-fargate namespace',
          'A MySQL deployment on the cluster, installed with the Bitnami Helm chart',
        ],
      },
      { type: 'heading', text: 'Project layout' },
      {
        type: 'paragraph',
        text: 'Each part of the infrastructure has its own file, which keeps things easy to read: provider.tf for the AWS and Helm providers and the S3 backend, vpc.tf for networking, eks.tf for the cluster, mysql.tf for the Helm release, variables.tf for inputs, and outputs.tf for the cluster name and endpoint.',
      },
      { type: 'heading', text: 'Running it' },
      {
        type: 'paragraph',
        text: 'You need AWS credentials configured and an S3 bucket for the remote state. Then:',
      },
      {
        type: 'code',
        code: 'cd terraform-config\nterraform init\nterraform apply\n\n# connect kubectl to the new cluster\naws eks update-kubeconfig --name <cluster-name> --region eu-central-1',
      },
      { type: 'heading', text: 'Jenkins pipeline' },
      {
        type: 'paragraph',
        text: 'The Jenkinsfile runs terraform init and terraform apply with auto-approve from the terraform-config directory. A small script, terraform-install.sh, installs Terraform on a Debian or Ubuntu Jenkins host.',
      },
      { type: 'heading', text: 'Notes' },
      {
        type: 'paragraph',
        text: 'This is a learning setup, not a production one. It has no private subnets and no restricted API endpoint access, and the MySQL values file contains placeholder credentials that should be replaced before real use.',
      },
      {
        type: 'paragraph',
        text: [
          'You can find the code on ',
          { text: 'GitHub', href: 'https://github.com/Vatcharadze/aws-eks-cluster-terraform' },
          '.',
        ],
      },
    ],
  },
  {
    slug: 'java-mysql-app-on-kubernetes',
    title: 'Deploying a Java and MySQL app on Kubernetes',
    date: '2026-08-11',
    category: 'Kubernetes',
    description:
      'Kubernetes manifests that run a Spring Boot app with MySQL and phpMyAdmin on Minikube, exposed through an nginx Ingress.',
    content: [
      {
        type: 'paragraph',
        text: 'This project contains the Kubernetes manifests and helper scripts to run a Spring Boot application backed by a MySQL database. phpMyAdmin is included so I can browse the database easily. Everything runs locally on Minikube.',
      },
      { type: 'heading', text: 'Architecture' },
      {
        type: 'list',
        items: [
          'Java app: 3 replicas of vatcharadze/java-kubernetes:1.0.0, reading database credentials from a Secret and a ConfigMap',
          'MySQL: mysql:8.0 with a PersistentVolumeClaim, so data survives pod restarts',
          'phpMyAdmin: a web interface for the database, reached through its own Service',
          'Ingress: an nginx Ingress routes traffic for java-mysql-app.com to the Java app on port 8080',
        ],
      },
      { type: 'heading', text: 'Deploying' },
      {
        type: 'paragraph',
        text: 'Order matters, because the Secret, storage, and ConfigMap must exist before the Deployments that use them. The run-script.sh helper applies everything in the right order and can start Minikube for you:',
      },
      {
        type: 'code',
        code: 'minikube start\nminikube addons enable ingress\n\nchmod +x run-script.sh\n./run-script.sh',
      },
      { type: 'heading', text: 'Accessing the services' },
      {
        type: 'code',
        code: '# Java app through the Ingress\necho "$(minikube ip) java-mysql-app.com" | sudo tee -a /etc/hosts\ncurl http://java-mysql-app.com/\n\n# phpMyAdmin through a port-forward\nkubectl port-forward svc/phpmyadmin-service 8081:8081',
      },
      { type: 'heading', text: 'Scaling and cleanup' },
      {
        type: 'paragraph',
        text: 'Scaling the app is a single command, and cleanup.sh removes everything that was deployed:',
      },
      {
        type: 'code',
        code: 'kubectl scale deployment/java-mysql-app-deployment --replicas=5\n\n./cleanup.sh',
      },
      {
        type: 'paragraph',
        text: 'The credentials in this project are example values for local development only. Replace them before using anything like this in a shared or production environment.',
      },
      {
        type: 'paragraph',
        text: [
          'The manifests are on ',
          { text: 'GitHub', href: 'https://github.com/Vatcharadze/java-mysql-app-k8s' },
          '.',
        ],
      },
    ],
  },
  {
    slug: 'mongodb-and-mongo-express-on-kubernetes',
    title: 'MongoDB and Mongo Express on Kubernetes',
    date: '2026-06-19',
    category: 'Kubernetes',
    description:
      'A simple Kubernetes setup that deploys MongoDB with the Mongo Express admin UI, using Deployments, Services, Secrets, and ConfigMaps.',
    content: [
      {
        type: 'paragraph',
        text: 'This project deploys MongoDB together with Mongo Express, a web-based admin interface for MongoDB. It is a small setup, but it covers the core Kubernetes building blocks: Deployments, Services, Secrets, and ConfigMaps.',
      },
      { type: 'heading', text: 'How the pieces fit together' },
      {
        type: 'list',
        items: [
          'MongoDB runs as a single-replica Deployment, exposed inside the cluster by a ClusterIP Service called mongodb-service on port 27017',
          'Mongo Express connects to MongoDB and is exposed outside the cluster by a LoadBalancer Service on port 8081 (NodePort 30000)',
          'The root username and password live in a Secret called mongodb-secret',
          'The MongoDB address lives in a ConfigMap called mongodb-configmap',
        ],
      },
      { type: 'heading', text: 'Setting your credentials' },
      {
        type: 'paragraph',
        text: 'Secrets store values in base64. Generate your own and paste them into mongodb-secret.yaml:',
      },
      {
        type: 'code',
        code: 'echo -n "yourusername" | base64\necho -n "yourpassword" | base64',
      },
      { type: 'heading', text: 'Applying the manifests' },
      {
        type: 'paragraph',
        text: 'The Secret and ConfigMap must exist before the Deployments that reference them, so the order is important:',
      },
      {
        type: 'code',
        code: 'kubectl apply -f mongodb-secret.yaml\nkubectl apply -f mongodb-deployment.yaml\nkubectl apply -f mongoexpress-configmap.yaml\nkubectl apply -f mongoexpress-deployment.yaml\n\nkubectl get pods\nkubectl get svc',
      },
      { type: 'heading', text: 'Opening Mongo Express' },
      {
        type: 'paragraph',
        text: 'On Minikube, one command opens the service in your browser:',
      },
      {
        type: 'code',
        code: 'minikube service mongo-express-service',
      },
      {
        type: 'paragraph',
        text: [
          'More of my work is on ',
          { text: 'GitHub', href: 'https://github.com/Vatcharadze/MongoDB-Kubernetes' },
          '.',
        ],
      },
    ],
  },
  {
    slug: 'nodejs-app-ci-cd-pipeline',
    title: 'A CI/CD pipeline for a Node.js app with Jenkins',
    date: '2026-03-11',
    category: 'DevOps',
    description:
      'A Jenkins pipeline that bumps the app version, runs tests, builds a Docker image, and pushes it to Docker Hub.',
    content: [
      {
        type: 'paragraph',
        text: 'This project automates the full path from code to a published container image for a Node.js app. On every run, Jenkins bumps the version, runs the tests, builds a Docker image, and pushes it to Docker Hub.',
      },
      { type: 'heading', text: 'Pipeline stages' },
      {
        type: 'list',
        items: [
          'Debug: prints the Node.js and npm versions and the working directory',
          'Increment Version: runs npm version patch to bump the version in package.json',
          'Get New Version: reads the new version and stores it in a pipeline variable',
          'Build: runs npm ci for a clean, reproducible install',
          'Test: runs npm test',
          'Build Image: builds the Docker image, logs in to Docker Hub, and pushes it',
          'Deploy: a placeholder for future deployment logic',
        ],
      },
      { type: 'heading', text: 'Image tagging' },
      {
        type: 'paragraph',
        text: 'Every image is tagged with the app version and the Jenkins build number, for example vatcharadze/demo-app:1.0.3-42. That way each build produces a unique image that is easy to trace back to a pipeline run.',
      },
      { type: 'heading', text: 'The Dockerfile' },
      {
        type: 'paragraph',
        text: 'The Dockerfile uses a multi-stage build on node:18-alpine. The first stage installs dependencies, and the second copies only what is needed to run the app. The container runs as the non-root node user and listens on port 3000.',
      },
      {
        type: 'code',
        code: 'docker build -t demo-app:local .\ndocker run -p 3000:3000 demo-app:local',
      },
      { type: 'heading', text: 'Jenkins setup' },
      {
        type: 'list',
        items: [
          'A NodeJS tool installation named nodejs18',
          'A Username and Password credential with the ID docker-hub-repo',
          'A Pipeline job set to Pipeline script from SCM, pointing at the repository',
        ],
      },
      {
        type: 'paragraph',
        text: [
          'The code is on ',
          { text: 'GitHub', href: 'https://github.com/Vatcharadze/NodeJS-App-Pipeline' },
          '.',
        ],
      },
    ],
  },
  {
    slug: 'dockerized-cpp-minecraft-terminal',
    title: 'A Dockerized C++ Minecraft terminal game',
    date: '2026-01-31',
    category: 'C++',
    description:
      'A terminal-based Minecraft-style game written in C++ and packaged with Docker and Docker Compose.',
    content: [
      {
        type: 'paragraph',
        text: 'This is a simple terminal game inspired by Minecraft, written in C++ and packaged in a container with Docker and Docker Compose. Players join the game, fight mobs, manage their health and hunger, and can even get OP status, all from the command line.',
      },
      { type: 'heading', text: 'Project structure' },
      {
        type: 'list',
        items: [
          'src/Driver.cpp and src/Header.h hold the game code',
          'docker/Dockerfile builds the image',
          'docker/docker-compose.yml defines how the container runs',
        ],
      },
      { type: 'heading', text: 'Running the game' },
      {
        type: 'paragraph',
        text: 'You only need Docker and Docker Compose installed. From the docker directory, run:',
      },
      {
        type: 'code',
        code: 'docker compose run cpp-app',
      },
      {
        type: 'paragraph',
        text: 'Press Ctrl + C to stop the program.',
      },
      { type: 'heading', text: 'Tech stack' },
      {
        type: 'list',
        items: [
          'Language: C++',
          'Compiler: GCC 15.2.0',
          'Containerization: Docker',
          'Orchestration: Docker Compose',
          'Version control: Git',
        ],
      },
      { type: 'heading', text: 'What I learned' },
      {
        type: 'paragraph',
        text: 'The best part of this project was seeing how Docker removes the usual setup problems. Anyone can run the game without installing a compiler, because the container already has everything it needs.',
      },
      {
        type: 'paragraph',
        text: [
          'See the code on ',
          { text: 'GitHub', href: 'https://github.com/Vatcharadze/Dockerized-CPP-App' },
          '.',
        ],
      },
    ],
  },
  {
  slug: 'jenkins-vs-argo-cd-gitops-evolution',
  title: 'Jenkins vs Argo CD: From Push-Based CI/CD to Pull-Based GitOps',
  date: '2026-11-01',
  category: 'DevOps',
  description:
    'How traditional CI/CD engines like Jenkins differ from Kubernetes-native GitOps tools like Argo CD, and when to use each.',
  content: [
    {
      type: 'paragraph',
      text: 'For years, Jenkins has been the go-to automation server for building, testing, and deploying software. But the rise of Kubernetes introduced cloud-native deployment patterns that exposed the limits of traditional automation, paving the way for Argo CD and the GitOps philosophy. Understanding how the two differ is key to choosing the right delivery strategy.',
    },

    {
      type: 'heading',
      text: 'Push-Based vs. Pull-Based Architecture',
    },
    {
      type: 'paragraph',
      text: 'The most fundamental difference is how deployments are triggered. Jenkins uses a push-based model: the pipeline runs externally and pushes changes to the target environment using administrative credentials. Argo CD uses a pull-based model: it runs inside the Kubernetes cluster, watches a Git repository, and pulls in configuration changes automatically, so cluster secrets are never exposed to outside systems.',
    },

    {
      type: 'heading',
      text: 'Continuous Reconciliation and Drift Detection',
    },
    {
      type: 'paragraph',
      text: 'A traditional Jenkins pipeline runs from start to finish and then stops. If someone manually changes the cluster afterwards, Jenkins will not notice until the next execution. Argo CD, by contrast, runs a continuous loop. It compares the live cluster state against the desired state in Git, then alerts you or automatically corrects the cluster whenever drift occurs.',
    },

    {
      type: 'heading',
      text: 'Scope of Responsibilities',
    },
    {
      type: 'list',
      items: [
        'Jenkins is a universal CI/CD tool. It compiles code, runs tests, builds Docker images, and manages infrastructure changes across virtual machines, bare metal, or containers.',
        'Argo CD is a Kubernetes-only CD (Continuous Delivery) tool. It does not compile code or run tests; its sole job is keeping live clusters in sync with the manifests in Git.',
      ],
    },

    {
      type: 'heading',
      text: 'Better Together: The Modern Pipeline',
    },
    {
      type: 'paragraph',
      text: 'Rather than choosing one over the other, many teams combine them. Jenkins handles continuous integration (CI): it tests the code and builds a new container image. It then updates the image tag in a dedicated Git manifest repository. Argo CD detects that commit and deploys the change into Kubernetes.',
    },
  ],
},
{
  slug: 'helm-vs-native-kubernetes-package-manager',
  title: 'Helm vs Native Kubernetes: Why Your Production Infrastructure Needs a Package Manager',
  date: '2026-11-04',
  category: 'DevOps',
  description:
    'How Helm, the package manager for Kubernetes, solves the rollback, duplication, and migration problems of managing production workloads with plain kubectl.',
  content: [
    {
      type: 'paragraph',
      text: 'If you have spent any time working with Kubernetes, you know the feeling of watching your application pods turn a healthy green. But that joy often evaporates when you need to scale across multiple environments (Dev, Staging, Prod), copy-paste hundreds of lines of YAML, or handle complex service rollbacks. This is where Helm comes in. Often described as the package manager for Kubernetes, Helm treats your application as a unified package rather than a fragmented collection of isolated YAML files.',
    },

    {
      type: 'heading',
      text: 'The Core Problem with Native Kubernetes',
    },
    {
      type: 'paragraph',
      text: 'In a pure Kubernetes setup, the platform views your infrastructure as discrete, disconnected objects: a Deployment here, a Service there, a ConfigMap over there. It does not understand that these components belong to a single, cohesive application. This disconnected view introduces major operational risks.',
    },

    {
      type: 'heading',
      text: 'The Rollback Nightmare',
    },
    {
      type: 'paragraph',
      text: 'Imagine you are deploying version v2 of a backend microservice. The release changes the container image tag in your Deployment and updates a database password in your ConfigMap. The new version immediately crashes, so you run the native rollback command: kubectl rollout undo deployment/backend-service. Kubernetes rolls the Deployment back to the v1 image, but it leaves the ConfigMap untouched with the new v2 password. Because kubectl rollout only understands individual deployments, your app is now stuck with mismatched versions and configurations.',
    },

    {
      type: 'heading',
      text: 'Boilerplate and Code Duplication',
    },
    {
      type: 'paragraph',
      text: 'To manage Dev and Production, you end up maintaining duplicate manifests, such as deployment-dev.yaml with 1 replica and deployment-prod.yaml with 10 replicas. If you add a single environment variable tomorrow, you must remember to update every file by hand, which is a playground for human error.',
    },

    {
      type: 'heading',
      text: 'How Helm Changes the Paradigm',
    },
    {
      type: 'paragraph',
      text: 'Helm packages all your manifests into a single unit called a Chart, turning static YAML files into dynamic templates powered by a centralized configuration file (values.yaml). One template package, controlled by small per-environment values files, replaces all the copy-pasted manifests.',
    },

    {
      type: 'heading',
      text: 'Scenario 1: Deploying a Ready-Made Monitoring Stack',
    },
    {
      type: 'paragraph',
      text: 'Say you need the complete Prometheus and Grafana monitoring stack in your cluster. With native Kubernetes, you must download dozens of separate YAML files (Deployments, Services, Alertmanagers, Node Exporters, RBAC rules, and CRDs), comb through thousands of lines to configure storage and service connections, and set secure admin passwords. Upgrading means repeating the whole manual merge. With Helm, the community maintains an official chart called kube-prometheus-stack, so you deploy the entire architecture in one command and pass your overrides inline.',
    },
    {
      type: 'code',
      code: 'helm install my-monitoring prometheus-community/kube-prometheus-stack --set grafana.adminPassword=SuperSecurePass123',
    },

    {
      type: 'heading',
      text: 'Scenario 2: Zero-Downtime Database Migrations',
    },
    {
      type: 'paragraph',
      text: 'Now imagine a release that needs a database schema migration, such as adding a column to a SQL table, before the new containers start serving traffic. With kubectl, Kubernetes spins up the new containers immediately. If one boots before the migration finishes, it throws errors and crashes, causing downtime. You would have to write a Kubernetes Job by hand, run it, wait for success, and only then apply your new Deployment.',
    },
    {
      type: 'paragraph',
      text: 'Helm solves this with Hooks, a built-in lifecycle tool. Add the annotation helm.sh/hook: pre-upgrade to your migration job, and when you run helm upgrade, Helm pauses the rollout, runs the migration first, verifies it succeeded, and only then deploys the new pods. If the migration fails, Helm halts the process and leaves your old version running safely.',
    },

    {
      type: 'heading',
      text: 'Direct Comparison: Helm vs. Native Kubernetes',
    },
    {
      type: 'list',
      items: [
        'Architectural scope: kubectl operates on isolated, individual resources. Helm operates on the entire application suite as a single unit.',
        'Environment management: kubectl means copy-pasting static YAML manifests per environment. Helm uses one dynamic template controlled by small values.yaml files.',
        'Rollback capability: kubectl rollbacks are limited to Deployments, so supporting ConfigMaps and Secrets stay broken. Helm restores an exact system-wide snapshot, and all resources revert in lockstep.',
        'Version history: with kubectl, history is scattered across underlying resource states. Helm keeps a centralized ledger (helm history) stored inside the cluster.',
      ],
    },

    {
      type: 'heading',
      text: 'The Red Button Principle',
    },
    {
      type: 'paragraph',
      text: 'For local development or tiny, single-container projects, plain kubectl is perfectly fine. But once you manage multi-component microservices and automated CI/CD pipelines in production, Helm shifts from a convenience to a core safety requirement. It gives your team a literal "Red Button": helm rollback. If a complex deployment goes sideways at 3:00 AM, you can revert your application, its dependencies, its configurations, and its secrets to a verified, working state in seconds.',
    },
  ],
},
]