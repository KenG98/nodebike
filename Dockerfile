FROM node:argon

# Create new user
RUN useradd -ms /bin/bash user

RUN npm install nodemon -g

# Set the working dir
WORKDIR /home/user/src

# Start terminal on startup
ENTRYPOINT ["/bin/sh", "-c", "su user && /bin/bash"]