FROM gitpod/workspace-full:latest

# Install Julia
RUN wget -q https://julialang-s3.julialang.org/bin/linux/x64/1.7/julia-1.7.0-linux-x86_64.tar.gz && \
    tar -xzf julia-1.7.0-linux-x86_64.tar.gz -C /usr/local && \
    rm julia-1.7.0-linux-x86_64.tar.gz && \
    ln -s /usr/local/julia-1.7.0/bin/julia /usr/local/bin/julia

# Precompile Julia standard library
RUN julia -e 'using Pkg; Pkg.precompile()'
