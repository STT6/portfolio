<template>
	<header class="fixed-header">
		<div class="page-header">
			<div class="container-fluid">
				<div class="row">
					<div class="col text-header">
						<!-- <div class="text mt-2 mb-2">
							Get to know
							<a href="#about-us">
								<p class="links">our
									projects
								</p>
							</a>,
							<a href="#about-us-2">
								<p class="links">read
									more about us
								</p>
							</a>or
							<a href="#get-in-touch">
								<p class="links">get in
									touch
								</p>
							</a>
						</div> -->
						<NuxtLink to="/">
							<div class="text mt-1 mb-1 mr-5 btn btn-primary">
								Home
							</div>
						</NuxtLink>
						<NuxtLink to="/projects">
							<div class="text mt-1 mb-1 btn btn-primary">
								Projects
							</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
