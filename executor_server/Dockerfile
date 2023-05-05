FROM ubuntu:20.04

ENV CONDA_ENV_NAME=executor_env
ENV EXECUTOR_USER executor
ENV EXECUTOR_UID 1000
ENV EXECUTOR_HOME /home/${EXECUTOR_USER}

ARG MINIFORGE_ARCH="x86_64"
ARG MINIFORGE_VERSION=4.10.1-4

SHELL ["/bin/bash", "-c"]

RUN apt-get -yq update \
    && apt-get -yq install --no-install-recommends \
    apt-transport-https \
    bash \
    ca-certificates \
    curl \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -M -s /bin/bash -N -u ${EXECUTOR_UID} ${EXECUTOR_USER} \
    && mkdir -p ${EXECUTOR_HOME} \
    && chown -R ${EXECUTOR_USER}:users ${EXECUTOR_HOME} \
    && chown -R ${EXECUTOR_USER}:users /usr/local/bin

ENV CONDA_DIR /opt/conda
ENV PATH "${CONDA_DIR}/bin:${PATH}"
RUN mkdir -p ${CONDA_DIR} && \
    chown -R ${EXECUTOR_USER}:users ${CONDA_DIR}

USER ${EXECUTOR_USER}

RUN wget -O /tmp/Miniforge3.sh "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh" && \
    /bin/bash /tmp/Miniforge3.sh -b -f -p "${CONDA_DIR}" && \
    rm /tmp/Miniforge3.sh && \
    echo ". ${CONDA_DIR}/etc/profile.d/conda.sh" >> ~/.bashrc && \
    ${CONDA_DIR}/bin/conda init bash && \
    . ~/.bashrc

COPY conda.yaml ${EXECUTOR_HOME}/conda.yaml


RUN conda env create --file ${EXECUTOR_HOME}/conda.yaml && \
    conda clean -afy && \
    echo "conda activate ${CONDA_ENV_NAME}" >> ~/.bashrc && \
    . ~/.bashrc

ENTRYPOINT [ "sleep", "infinity" ]
